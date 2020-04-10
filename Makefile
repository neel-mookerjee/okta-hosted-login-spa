REPOSITORY_NAME	:= "arghanil/okta-hosted-login-spa"
GITLAB_REPOSITORY := "$(REPOSITORY_NAME)"

check-var = $(if $(strip $($1)),,$(error var for "$1" is empty))

default: help

require_release:
	$(call check-var,release)
require_stack:
	$(call check-var,stack)
require_workspace:
	$(call check-var,workspace)
require_resource:
	$(call check-var,resource)


docker/build:		require_workspace ## build and tag the Docker image. vars:workspace
									@if [[ $(workspace) = "nonprod" ]]; then \
										cp js/.env.nonprod js/.env; \
										docker build -t $(REPOSITORY_NAME) -f ./docker/Dockerfile .; \
										rm js/.env; \
									elif [[ $(workspace) = "dev" ]]; then \
										cp js/.env.dev js/.env; \
										docker build -t $(REPOSITORY_NAME) -f ./docker/Dockerfile .; \
										rm js/.env; \
									elif [[ $(workspace) = "prod" ]]; then \
										cp js/.env.prod js/.env; \
										docker build -t $(REPOSITORY_NAME) -f ./docker/Dockerfile .; \
										rm js/.env; \
									fi

docker/push:		require_workspace require_release ## push the Docker image to ECR. vars:release, workspace
									@docker tag $(REPOSITORY_NAME) $(GITLAB_REPOSITORY):$(release);
									@docker push $(GITLAB_REPOSITORY):$(release); \

docker/run:			## Run the Docker image (latest) locally.
									@docker run -p 8000:8081 $(REPOSITORY_NAME)

tf/plan:			require_workspace require_stack require_release ## Run the terraform plan. vars:stack, workspace, release
									@cd terraform/stacks/${stack} && terraform workspace select $(workspace) && terraform plan -var release=$(release) -var environment=$(workspace)

tf/apply:			require_workspace require_stack require_release ## Run the terraform apply command. vars:stack, workspace, release
									@cd terraform/stacks/${stack} && terraform workspace select $(workspace) && terraform apply -var release=$(release) -var environment=$(workspace)

tf/destroy:			require_workspace require_stack require_release ## Run the terraform destroy command. vars:stack, workspace, release
									@cd terraform/stacks/${stack} && terraform workspace select $(workspace) && terraform destroy -var release=$(release)

tf/taint:			require_workspace require_stack require_resource ## Taint a terraform resource. vars:stack, workspace, resource
									@cd terraform/stacks/${stack} && terraform workspace select $(workspace) && terraform taint ${resource}

deploy:           	require_stack require_workspace require_release ## Compiles, builds and deploys a stack for a release as tag. vars: release, stack, workspace
									@make docker/build
									@make docker/push release=$(release) workspace=${workspace}
									@make tf/apply stack=$(stack) workspace=${workspace} release=$(release)

deploy-slim:        require_stack require_workspace ## Compiles, builds and deploys a stack with the docker image and release from .release directory. vars: stack, workspace
									@make docker/build
									@make docker/push release=`cat .release` workspace=${workspace}
									@make tf/apply stack=$(stack) workspace=${workspace} release=`cat .release`

help: 				# This is default and it helps
									@echo "\n  ## OKTA-LOGIN\n"
									@awk 'BEGIN {FS = ":.*?## "} /^[\/a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "  \033[36mokta-login =>    make \033[0m%-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
									@echo
