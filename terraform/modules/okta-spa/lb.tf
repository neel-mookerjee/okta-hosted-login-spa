resource "aws_elb" "ui" {
  name                      = "${var.stack_name}-elb"
  internal                  = true
  subnets                   = "${var.subnet_ids}"
  instances                 = "${aws_instance.ui.*.id}"
  cross_zone_load_balancing = true

  security_groups = [
    "${aws_security_group.ui_lb.id}",
  ]

  listener {
    lb_port            = 443
    lb_protocol        = "SSL"
    instance_port      = "${var.application_port}"
    instance_protocol  = "TCP"
    ssl_certificate_id = "${var.lb_ssl_certificate_id}"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 5
    timeout             = 10
    interval            = 20
    target              = "TCP:${var.application_port}"
  }

  tags = {
    cluster = "${var.stack_name}"
  }
}
