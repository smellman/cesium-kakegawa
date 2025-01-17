# Kakegawa Castle on Cesium

This is a 3D model of Kakegawa Castle in Japan, created using CesiumJS.

## How to create 3DTiles from virtual shizuoka project

### Preparation

Download zip file from [掛川城オープンデータ化プロジェクト](https://www.geospatial.jp/ckan/dataset/kakegawacastle/resource/61d02b61-3a44-4a5b-b263-814c6aa23551).

```sh
brew install unar # for mac
brew install pdal # for mac
mkdir work
cd work
cp ~/Downloads/20190308KakegawaCastle.zip .
unar 20190308KakegawaCastle.zip
mv 20190308掛川城.las 20190308KakegawaCastle.las
pdal translate --reader las --writer las --filters.reprojection.in_srs=EPSG:2450 --filters.reprojection.out_srs=EPSG:6676 --writers.las.a_srs=EPSG:6676 20190308KakegawaCastle.las 20190308KakegawaCastle-6676.las filters.reprojection
cd ..
```

### Convert 3DTiles v1.1 with [point-tiler](https://github.com/MIERUNE/point-tiler)

Note: I recommend to use 128GB memory machine for this process.

You need Rust, see: [Getting Started](https://www.rust-lang.org/learn/get-started)

```sh
rustup update
cd work
git clone git@github.com:MIERUNE/point-tiler.git
cd point-tiler
cargo build --release
cd ..
./point-tiler/target/release/app --input ./20190308KakegawaCastle-6676.las \
    --output ./kakegawa_v1.1 \
    --epsg 6676 \
    --min 15 \
    --max 24 \
    --max-memory-mb 8192
```

## Development

```sh
npm install
npm run dev
```

Then access to http://localhost:5173/cesium-kakegawa/
