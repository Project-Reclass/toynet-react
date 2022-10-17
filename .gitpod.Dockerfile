FROM ubuntu:18.04

RUN apt-get update && apt-get install -y apt-transport-https && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    iproute2 \
    iputils-ping \
    mininet \
    net-tools \
    openvswitch-switch \
    openvswitch-testcontroller \
    gcc \
    git \
    python3.6-dev \
    python3-pip