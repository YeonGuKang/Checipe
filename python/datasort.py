import urllib.request as ul
import xmltodict
import json
import sys
import io

key='ddc71faf24fc455e8410'
start = '1'
end = '1000'

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')
# 아톰에디터 한글사용을 위한 구문

url = "http://openapi.foodsafetykorea.go.kr/api/"+key+"/COOKRCP01/xml/"+start+"/"+end
# 데이터를 받을 url

request = ul.Request(url)
# url의 데이터를 요청함

response = ul.urlopen(request)
# 요청받은 데이터를 열어줌

rescode = response.getcode()
# 제대로 데이터가 수신됐는지 확인하는 코드 성공시 200
print(rescode,'\n\n')
if (rescode == 200):
    responseData = response.read()
    # 요청받은 데이터를 읽음
    rD = xmltodict.parse(responseData)
    # XML형식의 데이터를 dict형식으로 변환시켜줌

    rDJ = json.dumps(rD)
    # dict 형식의 데이터를 json형식으로 변환

    rDD = json.loads(rDJ)
    # json형식의 데이터를 dict 형식으로 변환
    print(rDD)
    # 정상적으로 데이터가 출력되는지 확인

    w_data = rDD['RCP_WAY2']['RCP_PART_DTLS']

    print(w_data)