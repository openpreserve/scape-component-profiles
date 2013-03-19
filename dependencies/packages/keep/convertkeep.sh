#!/bin/sh

awk -v repositoryId="scape-keep-debian-repository" -v repositoryName="SCAPE Keep Debian Repository" -v repositoryLocation="deb http://scape.keep.pt/apt stable main" -v ontologyUri="http://scape.keep.pt/vocab/dependencies" -f ../pkg2owl.awk Packages

