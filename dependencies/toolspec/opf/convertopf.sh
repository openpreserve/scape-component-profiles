#!/bin/bash

../toolspec2owl.rb --ontologyUri "http://deb.openplanetsfoundation.org/vocab/dependencies" --repositoryId "opf-debian-repository" --repositoryName "OPF Debian Repository" --repositoryLocation "deb http://deb.openplanetsfoundation.org stable main" $@

