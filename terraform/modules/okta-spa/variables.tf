variable "stack_name" {}

variable "release" {}

variable "dns_prefix" {}

variable "vpc_id" {}
variable "environment" {}

variable "subnet_ids" {
  type = "list"
}

variable "dmz_subnet_ids" {
  type = "list"
}

data "aws_subnet" "current" {
  count = "${length(var.subnet_ids)}"
  id    = "${element(var.subnet_ids, count.index)}"
}

variable "keypair" {}

variable "instance_tags" {
  type    = "map"
  default = {}
}

variable "aws_region" {}
variable "aws_profile" {}
variable "lb_ssl_certificate_id" {}
variable "aws_route53_zone" {}
variable "stack" {}
variable "ami" {}
variable "instance_type" {}
variable "number_of_nodes" {}

variable "okta_spa_docker_image" {}

variable "datadog_api_key" {}

variable "gitlab_token" {}

variable "ddagent_docker_image" {}

variable "splunk_token" {}

variable "fluentbit_docker_image" {}

variable "assume_role_policy" {
  default = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {"Service": "ec2.amazonaws.com"},
      "Effect": "Allow"
    }
  ]
}
EOF
}

variable "application_port" {}
