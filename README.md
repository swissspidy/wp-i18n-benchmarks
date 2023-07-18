# WordPress I18N Benchmarks

Benchmarks comparing various WordPress i18n performance enhancements.

## Latest Results

Latest tests show that [Ginger MO](https://github.com/swissspidy/ginger-mo) is much faster at loading translations than the built-in localization system in WordPress core.

The following numbers are for a site running 6.3 Beta with multiple active plugins.

**Twenty Twenty-Three**

| Locale |       Scenario        | Object Cache | wp-memory-usage | wp-total  | TTFB      |
|:-------|:---------------------:|:------------:|:---------------:|:---------:|:----------|
| en_US  |        Default        |              |    15.60 MB     | 133.58 ms | 138.75 ms |
| de_DE  |        Default        |              |    29.14 MB     | 181.95 ms | 187.65 ms |
| de_DE  |    Ginger MO (MO)     |              |    19.24 MB     | 159.18 ms | 164.30 ms |
| de_DE  |    Ginger MO (PHP)    |              |    16.98 MB     | 138.14 ms | 143.45 ms |
| de_DE  |   Ginger MO (JSON)    |              |    19.24 MB     | 153.39 ms | 158.65 ms |
| de_DE  |    Native Gettext     |              |    15.99 MB     | 142.12 ms | 147.45 ms |
| de_DE  |        DynaMo         |              |    19.62 MB     | 157.93 ms | 163.75 ms |
| de_DE  |     Cache in APCu     |              |    50.37 MB     | 181.51 ms | 187.15 ms |
| en_US  |        Default        |      ✅       |    15.67 MB     | 121.53 ms | 127.10 ms |
| de_DE  |        Default        |      ✅       |    29.01 MB     | 167.67 ms | 173.55 ms |
| de_DE  |    Ginger MO (MO)     |      ✅       |    19.11 MB     | 147.19 ms | 152.70 ms |
| de_DE  |    Ginger MO (PHP)    |      ✅       |    16.85 MB     | 127.97 ms | 133.65 ms |
| de_DE  |   Ginger MO (JSON)    |      ✅       |    19.11 MB     | 144.43 ms | 149.95 ms |
| de_DE  |    Native Gettext     |      ✅       |    15.86 MB     | 129.19 ms | 134.80 ms |
| de_DE  |        DynaMo         |      ✅       |    18.57 MB     | 133.46 ms | 139.45 ms |
| de_DE  |     Cache in APCu     |      ✅       |    50.30 MB     | 170.19 ms | 176.20 ms |
| de_DE  | Cache in object cache |      ✅       |    29.07 MB     | 173.19 ms | 179.25 ms |

**Twenty Twenty-One**

| Locale |       Scenario        | Object Cache | wp-memory-usage | wp-total  | TTFB      |
|:-------|:---------------------:|:------------:|:---------------:|:---------:|:----------|
| en_US  |        Default        |              |    15.35 MB     | 120.79 ms | 125.75 ms |
| de_DE  |        Default        |              |    28.79 MB     | 172.10 ms | 177.50 ms |
| de_DE  |    Ginger MO (MO)     |              |    18.85 MB     | 145.68 ms | 150.85 ms |
| de_DE  |    Ginger MO (PHP)    |              |    16.56 MB     | 124.73 ms | 129.80 ms |
| de_DE  |   Ginger MO (JSON)    |              |    18.84 MB     | 140.78 ms | 145.90 ms |
| de_DE  |    Native Gettext     |              |    15.58 MB     | 128.26 ms | 133.25 ms |
| de_DE  |        DynaMo         |              |    19.24 MB     | 146.09 ms | 151.50 ms |
| de_DE  |     Cache in APCu     |              |    50.13 MB     | 167.28 ms | 173.00 ms |
| en_US  |        Default        |      ✅       |    15.19 MB     | 107.26 ms | 112.65 ms |
| de_DE  |        Default        |      ✅       |    28.59 MB     | 154.30 ms | 160.30 ms |
| de_DE  |    Ginger MO (MO)     |      ✅       |    18.64 MB     | 133.21 ms | 138.65 ms |
| de_DE  |    Ginger MO (PHP)    |      ✅       |    16.37 MB     | 112.94 ms | 118.45 ms |
| de_DE  |   Ginger MO (JSON)    |      ✅       |    18.64 MB     | 128.94 ms | 134.60 ms |
| de_DE  |    Native Gettext     |      ✅       |    15.38 MB     | 115.11 ms | 120.85 ms |
| de_DE  |        DynaMo         |      ✅       |    18.10 MB     | 120.72 ms | 126.20 ms |
| de_DE  |     Cache in APCu     |      ✅       |    49.99 MB     | 151.82 ms | 157.50 ms |
| de_DE  | Cache in object cache |      ✅       |    28.65 MB     | 156.36 ms | 162.20 ms |

**WordPress Admin**

| Locale |       Scenario        | Object Cache | wp-memory-usage | wp-total  | TTFB      |
|:-------|:---------------------:|:------------:|:---------------:|:---------:|:----------|
| en_US  |        Default        |              |    15.42 MB     | 139.83 ms | 155.60 ms |
| de_DE  |        Default        |              |    31.92 MB     | 187.76 ms | 199.05 ms |
| de_DE  |    Ginger MO (MO)     |              |    20.07 MB     | 164.94 ms | 175.10 ms |
| de_DE  |    Ginger MO (PHP)    |              |    17.09 MB     | 139.66 ms | 149.90 ms |
| de_DE  |   Ginger MO (JSON)    |              |    20.06 MB     | 160.87 ms | 175.05 ms |
| de_DE  |    Native Gettext     |              |    15.95 MB     | 143.43 ms | 153.60 ms |
| de_DE  |        DynaMo         |              |    20.58 MB     | 166.79 ms | 178.05 ms |
| de_DE  |     Cache in APCu     |              |    58.13 MB     | 190.38 ms | 201.20 ms |
| en_US  |        Default        |      ✅       |    15.66 MB     | 112.69 ms | 127.50 ms |
| de_DE  |        Default        |      ✅       |    31.84 MB     | 164.26 ms | 177.00 ms |
| de_DE  |    Ginger MO (MO)     |      ✅       |    19.99 MB     | 140.70 ms | 153.55 ms |
| de_DE  |    Ginger MO (PHP)    |      ✅       |    17.01 MB     | 118.52 ms | 129.25 ms |
| de_DE  |   Ginger MO (JSON)    |      ✅       |    19.98 MB     | 138.49 ms | 151.55 ms |
| de_DE  |    Native Gettext     |      ✅       |    15.87 MB     | 120.01 ms | 130.40 ms |
| de_DE  |        DynaMo         |      ✅       |    19.73 MB     | 120.26 ms | 130.50 ms |
| de_DE  |     Cache in APCu     |      ✅       |    58.07 MB     | 162.41 ms | 172.90 ms |
| de_DE  | Cache in object cache |      ✅       |    31.86 MB     | 164.28 ms | 175.90 ms |
