#!/bin/bash

../toolspec2owl.rb --ontologyUri "http://scape.keep.pt/vocab/dependencies" --repositoryId "scape-keep-debian-repository" --repositoryName "SCAPE Keep Debian Repository" --repositoryLocation "deb http://scape.keep.pt/apt stable main" $@

