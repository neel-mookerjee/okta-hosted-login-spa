data "template_file" "cloud_config" {
  count    = "${var.number_of_nodes}"
  template = "${file("${path.module}/cloud-config.template.yaml")}"

  vars = {
    stack_name       = "${var.stack_name}"
    workspace        = "${terraform.workspace}"
    node_name        = "okta-spa-${count.index + 1}"
    docker_image     = "${var.okta_spa_docker_image}"
    application_port = "${var.application_port}"

    datadog_api_key      = "${var.datadog_api_key}"
    datadog_tags         = "${join(",", formatlist("%s", concat(keys(var.instance_tags), list("node_name"))))}"
    ddagent_docker_image = "${var.ddagent_docker_image}"

    fluentbit_docker_image = "${var.fluentbit_docker_image}"
    splunk_token           = "${var.splunk_token}"

    gitlab_token = "${var.gitlab_token}"
  }
}
