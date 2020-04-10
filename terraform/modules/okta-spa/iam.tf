resource "aws_iam_role" "ui" {
  name                  = "${var.stack_name}"
  force_detach_policies = true
  assume_role_policy    = "${var.assume_role_policy}"
}

resource "aws_iam_instance_profile" "ui" {
  name = "${var.stack_name}"
  role = "${aws_iam_role.ui.id}"
}
