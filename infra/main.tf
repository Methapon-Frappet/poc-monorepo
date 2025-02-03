terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
    minio = {
      source = "aminueza/minio"
    }
    rabbitmq = {
      source = "cyrilgdn/rabbitmq"
    }
  }
}

variable "org_docker_registry" {
  description = "Docker Image Registry"
}

variable "minio_server" {
  description = "Minio Server Host and Port"
}

variable "minio_user" {
  description = "Minio Username"
}

variable "minio_password" {
  description = "Minio Password"
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

resource "docker_network" "monorepo_network" {
  name = "monorepo-network"
}

provider "minio" {
  minio_server   = var.minio_server
  minio_user     = var.minio_user
  minio_password = var.minio_password
}
