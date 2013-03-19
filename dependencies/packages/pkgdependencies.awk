BEGIN {
    FS = ": ";
}

$1 == "Package" {
    packageName = $2
    localPackages[packageName] = 1
}

$1 == "Depends" {
    split($2, newPackages, ", ")
    for (newPackage in newPackages)  {
        packages[newPackages[newPackage]] = 1
    }
}

END {
    for (package in packages) {
        if (! localPackages[package]) {
            gsub(/\(.+\)/, "", package)
            print package
        }
    } 
}

