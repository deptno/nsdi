# NSDI 다운로더

[http://openapi.nsdi.go.kr/nsdi/index.do](http://openapi.nsdi.go.kr/nsdi/index.do)
주기적 다운로드 자동화를 위한 다운로더

현재 변동 데이터만을 지원

### 실행
npx
```shell script
npx nsdi --help
npx nsdi -t 연속지적도형정보 -s 20191219 -f shp
```
```shell script
npm -g install nsdi # 글로벌 설치
nsdi --help
nsdi -t 연속지적도형정보 -s 20191219 -f shp
```

예제
```shell script
  npx nsdi -t 연속지적도형정보 -s 20191219 -f shp
Downloading Chromium r706915 - 111.8 Mb [====================] 100% 0.0s 
대상 파일 수: 1
......1/1 완료, CH_00_D002_20191221.zip(5328452 바이트)
```