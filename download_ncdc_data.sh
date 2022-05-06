#!/usr/bin/env bash

# global parameters
g_tmp_folder="ncdc_tmp";
g_output_folder="ncdc";

g_remote_host="www.ncei.noaa.gov/data/global-hourly/access";
# g_remote_path="pub/data/ghcn/daily/by_year";


# $1: folder_path
function create_folder {
    if [ -d "$1" ]; then
        rm -rf "$1";
    fi
    mkdir "$1"
}

# $1: year to download
function download_data {
    local source_url="https://$g_remote_host/$1/"
    wget -r -c --no-parent -nH --cut-dirs 5 -P "$g_output_folder/$1" "$source_url"; -b

}

# $1 - start year
# $2 - finish year
function main {
    local start_year=1901
    local finish_year=2022

    if [ -n "$1" ]; then
        start_year=$1
    fi

    if [ -n "$2" ]; then
        finish_year=$2
    fi

    create_folder $g_tmp_folder
    create_folder $g_output_folder

    for year in `seq $start_year $finish_year`; do
        download_data $year
    done

    rm -rf "$g_tmp_folder"
}

main $1 $2
