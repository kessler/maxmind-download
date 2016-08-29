# maxmind-download
download stuff found in sources.json and extract them using shell (gunzip)
this tool is set to download geolite2 mmdb databases.
for older geolite databases use [version 1.x.x](https://github.com/kessler/maxmind-download/tree/v1.0.1)

## Install
```
npm install -g maxmind-download
```

## Usage
```
    $ maxmind-download
```
download into *current directory/download* 

```
    $ maxmind-download --target=/some/absolute/path
```
download into target (no download subdirectory)

```
    $ maxmind-download --silent=true
```
silent download, no output

![be a good cat](https://raw.githubusercontent.com/kessler/static/master/maxmind-download.png)