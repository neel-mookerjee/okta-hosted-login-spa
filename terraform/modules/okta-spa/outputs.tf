output "instance_ids" {
  value = ["${aws_instance.ui.*.id}"]
}

output "instance_ips" {
  value = ["${aws_instance.ui.*.private_ip}"]
}

output "instance_azs" {
  value = ["${aws_instance.ui.*.availability_zone}"]
}

output "ip" {
  value = "${join(",", aws_instance.ui.*.public_ip)}"
}

output "bootstrap_dns" {
  value = "${aws_route53_record.ui.fqdn}"
}
