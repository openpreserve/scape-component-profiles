#!/bin/bash

BASE=http://purl.org/DP

DOC_GEN="java -jar parrot-jar-with-dependencies.jar"

$DOC_GEN -i $BASE/components -o scape-component-profiles.html
$DOC_GEN -i $BASE/components/licenses -o scape-component-profiles-licenses.html