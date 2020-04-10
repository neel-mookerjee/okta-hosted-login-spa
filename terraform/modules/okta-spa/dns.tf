resource "aws_route53_record" "ui" {
  zone_id = "${var.aws_route53_zone}"
  name    = "${var.dns_prefix}"
  type    = "A"

  alias {
    name                   = "${aws_elb.ui.dns_name}"
    zone_id                = "${aws_elb.ui.zone_id}"
    evaluate_target_health = true
  }
}
