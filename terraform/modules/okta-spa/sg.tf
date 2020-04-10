resource "aws_security_group" "ui" {
  vpc_id      = "${var.vpc_id}"
  name        = "${var.stack_name}-sg"
  description = "ui security group"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  ingress {
    from_port   = "${var.application_port}"
    to_port     = "${var.application_port}"
    protocol    = "tcp"
    cidr_blocks = ["172.0.0.0/8"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

resource "aws_security_group" "ui_lb" {
  name        = "${var.stack_name}-lb-sg"
  description = "ui load balancer security group"
  vpc_id      = "${var.vpc_id}"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8", "172.0.0.0/8"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
