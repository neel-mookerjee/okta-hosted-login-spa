data "aws_secretsmanager_secret" "api-keys" {
  name = "api-keys"
}
// get the latest version of the secret
data "aws_secretsmanager_secret_version" "api_keys" {
  secret_id = "${data.aws_secretsmanager_secret.api-keys.id}"
}
// this is the way to produce the map off the secret_string
data "external" "api-keys" {
  program = ["echo", "${data.aws_secretsmanager_secret_version.api_keys.secret_string}"]
}

