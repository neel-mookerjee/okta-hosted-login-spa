resource "aws_instance" "ui" {
  count                  = "${var.number_of_nodes}"
  ami                    = "${var.ami}"
  instance_type          = "${var.instance_type}"
  key_name               = "${var.keypair}"
  vpc_security_group_ids = ["${aws_security_group.ui.id}"]
  subnet_id              = "${element(var.subnet_ids, count.index % length(var.subnet_ids))}"
  iam_instance_profile   = "${aws_iam_instance_profile.ui.id}"

  user_data = "${element(data.template_file.cloud_config.*.rendered, count.index)}"

  tags = "${merge(
    var.instance_tags,
    map(
      "Name", "${var.stack_name}-${count.index + 1}",
      "stackname", "${var.stack_name}",
      "environment", "${terraform.workspace}",
      "release", "${var.release}"
  ))}"

  depends_on = [
    "aws_security_group.ui",
    "aws_iam_instance_profile.ui",
  ]

  lifecycle {
    ignore_changes = ["ami"]
  }
}
