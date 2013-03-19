#!/bin/sh

awk -v repositoryId="opf-debian-repository" -v repositoryName="OPF Debian Repository" -v repositoryLocation="deb http://deb.openplanetsfoundation.org stable main" -v ontologyUri="http://deb.openplanetsfoundation.org/vocab/dependencies" -v license="http://www.gnu.org/licenses/gpl-3.0" -f ../pkg2owl.awk Packages

