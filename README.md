# Checipe Website - Recipes for Vegitarian :herb:
https://jongmin4422.github.io/Checipe/
>> Now, yet only for KOREAN

## Reason for Project :eyes:
  - More and more people are eating vegetables because of environment, religion, and health.
  <img width="100%" height="500" src=https://user-images.githubusercontent.com/37290818/109410729-52940680-79e0-11eb-8298-04aad0587266.png>
  
  
  - As a result, food and recipes are becoming more diverse.
  - There are many different kinds of vegetarian, and I wanted to organize these kinds with food.

## Features of a Web Page :mag_right:
<img width="100%" height="500" src=https://user-images.githubusercontent.com/37290818/109410286-bcaaac80-79dc-11eb-8fe7-46cbed7792bc.PNG>
<img width="100%" height="500" src=https://user-images.githubusercontent.com/37290818/109410521-b1588080-79de-11eb-9024-dd11acd7d5c8.png>




  - Depending on the variety of vegetarian types, users can check the recipes that they can eat on their own.
  - Users can bookmark their recipes and click Like.
  - Even if you are not a vegetarian, you can check various recipes by dividing them into types of food.
  - Our recipes are over 1.2K

## Used :trollface:
  - Python
    : The information of all the recipes opened was processed and stored in the database by Python.
    ~~~
     req = requests.get(url)
    html = req.text
    soup = BeautifulSoup(html, 'html.parser')
    rcpingre = soup.find_all('rcp_parts_dtls')
    for rcp in rcpingre:
        temp = rcp.text.replace('\r', '').replace('\n', ',')
        edit_ingre = (temp.split(','))
        hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a3]+')  #한글 외 문자
        for d in edit_ingre:
            d = re.sub(r'\([^)]*\)', '', d) # 괄호 안의 것 필터링
            d = re.sub(r'약간|적당량|다진것|\d.', '', d)  # 괄호 안의 것 필터링
            ingre.append(hangul.sub(' ', d).strip())  # 한글과 띄어쓰기를 제외한 모든 부분 필터링
            print(ingre)
    start = end+1
    end = 1237
    t += 1
    ~~~
  - React
    : By using React, the development was carried out in a simple harmony between the front and backend.
    ~~~
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App';
    import firebase from "./firebase";

    ReactDOM.render( <App />, document.getElementById('root'));
    ~~~
  - Javascript
    : JavaScript has developed functions that operate on web pages.
  - Css
    : The design portion of the web page was developed as Css.
  - Firebase
    : Database used Google's Firebase (Firestore).
    ~~~
    import firebase from "firebase/app";
    import "firebase/auth";
    import "firebase/firestore";

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
       
      };

      firebase.initializeApp(firebaseConfig);

    export const firebaseInstance = firebase;
    export const authService = firebase.auth();
    export const dbService = firebase.firestore();
    ~~~
    
## Reference :book:
  - https://nomadcoders.co/nwitter : It was developed by referring to Nomad coder's Twitter clone coding.
  - https://www.foodsafetykorea.go.kr/apiMain.do : It is a site that brought open recipe information.
  - https://console.firebase.google.com/u/0/ : Google Firebase (We used for database)
  - https://react-slick.neostack.com/ : The slider on the main page used Slick.



## Contributor :octocat:
https://github.com/YeonGuKang \
https://github.com/jongmin4422 \
https://github.com/kwjinwoo \
https://github.com/slshinelum
