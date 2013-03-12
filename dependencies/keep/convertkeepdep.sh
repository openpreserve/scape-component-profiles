#!/bin/sh

awk -v repositoryId="scape-keep-squeeze-debian-repository" -v repositoryName="SCAPE Keep Dependencies Squeeze Debian Repository" -v repositoryLocation="deb ftp://ftp.pt.debian.org/debian/ squeeze main" -v ontologyUri="http://scape.keep.pt/vocab/dependencies/squeeze" -v filterFile="dependencies" -f ../pkg2owl.awk $1

