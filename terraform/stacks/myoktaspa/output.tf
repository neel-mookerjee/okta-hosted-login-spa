output "ui-Instance-Ids" {
  value = "${module.ui.instance_ids}"
}

output "ui-Instance-IPs" {
  value = "${module.ui.instance_ips}"
}

output "ui-Route53" {
  value = "${module.ui.bootstrap_dns}"
}
