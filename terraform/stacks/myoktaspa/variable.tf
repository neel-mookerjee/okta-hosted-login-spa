terraform {
  required_version = ">0.12.0"

  backend "s3" {
    bucket = "tfstate-okta-spa"
    key    = "platform/resources/terraform.tfstate"
    region = "us-west-2"
  }
}

variable "stack" {
  default = {
    "dev"     = "okta-dev"
  }
}

variable "release" {
}

variable "dns_prefix" {
  default = {
    "dev"     = "okta-dev"
  }
}

variable "environment" {
}

variable "okta_spa_docker_image_base" {
  default = {
    "dev"     = "okta-hosted-login-spa"
\  }
}

variable "number_of_nodes" {
  default = {
    "dev"     = 1
  }
}

variable "instance_type" {
  default = {
    "dev"     = "m5.4xlarge"
  }
}

variable "keypair" {
  default = {
    "dev"     = "dev-keypair"
  }
}

variable "aws_region" {
  default = {
    "dev"     = "us-west-2b"
  }
}

variable "dmz_subnet_ids" {
  default = {
    "dev"     = ["subnet-da9fdbbd", "subnet-fdcf51b4"]
  }
}

variable "subnet_ids" {
  default = {
    "dev"     = ["subnet-f04480b9", "subnet-9c08aafb"]
  }
}

variable "aws_route53_zone" {
  default = {
    "dev"     = "Z35BMLW9UPB2ND"
  }
}

variable "ami" {
  default = {
    "dev"     = "ami-09e088627f26fd7ec"
  }
}

variable "ddagent_docker_image" {
  default = {
    "dev"     = "datadog/docker-dd-agent:12.6.5240-jmx"
  }
}

variable "fluentbit_docker_image" {
  default = {
    "dev"     = "fluent-bit/fluent-bit:1.1.1"
  }
}

variable vpc_id {
  default = {
    "dev"     = "vpc-f837b99f"
  }
}

variable "lb_ssl_certificate_id" {
  default = {
    "dev"     = "arn:aws:acm:us-west-2:713924792577:certificate/cert-id"
  }
}

variable "application_port" {
  default = {
    "dev"     = "8081"
  }
}

locals {
  datadog_api_key = "${data.external.api-keys.result["datadog_api_key"]}"
  splunk_token    = "${data.external.api-keys.result["splunk_api_token"]}"
}
