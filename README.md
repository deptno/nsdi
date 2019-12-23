# NSDI 다운로더

[http://openapi.nsdi.go.kr/nsdi/index.do](http://openapi.nsdi.go.kr/nsdi/index.do)
주기적 다운로드 자동화를 위한 다운로더

현재 변동 데이터만을 지원

### 실행
npx
```shell script
$ npx nsdi --help
$ npx nsdi -t 연속지적도형정보 -s 20191219 -f shp
```
```shell script
$ npm -g install nsdi # 글로벌 설치
$ nsdi --help
$ nsdi -t 연속지적도형정보 -s 20191219 -f shp
```

### 사용 예
```shell script
$ npx nsdi   
Usage: nsdi [options]

Options:
  -V, --version              output the version number
  -l, --list                 다운로드 가능한 목록
  -t, --type <value>         연속지적도형정보
  -f, --file <value>         shp OR csv
  -s, --starts-with <value>  > yyyyMMdd
  -h, --help                 output usage information
```

타입 목록
```shell script
$ nsdi -l
공간융합 개방데이터(17년)   -  4건
    # 건축물연령정보 [SHP, CSV]
    # 용도별건물정보 [SHP, CSV]
    # 지가변동률정보 [SHP, CSV]
    # 토지특성정보 [SHP, CSV]

국가공간 개방데이터(16년)   -  12건
    # GIS건물일반집합정보 [SHP]
    # 개별공시지가정보 [SHP, CSV]
    # 개별주택가격정보 [SHP, CSV]
    # 공동주택가격정보 [SHP, CSV]
    # 도서(섬)정보 [SHP, CSV]
    # 부동산개발업정보 [SHP, CSV]
    # 부동산중개업정보 [SHP, CSV]
    # 토지소유정보 [SHP, CSV]
    # 토지이동이력정보 [CSV]
    # 토지이용계획정보 [SHP, CSV]
    # 통계성지표정보 [CSV]
    # 표준지공시지가정보 [SHP, CSV]

도시계획 개방데이터(16년)   -  9건
    # 개발행위허가정보 [CSV]
    # 도시계획통계시설정보 [SHP, CSV]
    # 도시군기본계획정보 [CSV]
    # 시설정보(도시계획) [CSV]
    # 실시계획인가정보 [CSV]
    # 용도지역정보(도시계획) [CSV]
    # 지구단위계획구역정보 [SHP, CSV]
    # 토지이용규제법령정보 [CSV]
    # 토지이용규제행위제한정보 [CSV]

부동산 개방데이터(15년)   -  11건
    # GIS건물통합정보 [SHP]
    # 공유지연명정보 [CSV]
    # 대지권등록정보 [CSV]
    # 법정구역정보 [SHP]
    # 연속지적도형정보 [SHP]
    # 용도지역지구정보 [SHP]
    # 지적도근점정보 [SHP]
    # 지적삼각보조점정보 [SHP]
    # 지적삼각점정보 [SHP]
    # 토지등급정보 [CSV]
    # 토지임야정보 [CSV]
```

다운로드
```shell script
$ npx nsdi -t 연속지적도형정보 -s 20191219 -f shp
Downloading Chromium r706915 - 111.8 Mb [====================] 100% 0.0s 
대상 파일 수: 1
......1/1 완료, CH_00_D002_20191221.zip(5328452 바이트)
```