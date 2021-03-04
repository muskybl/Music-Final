# Introduce
This is the project about - Music website with CNN(NLP) for recommandation system
I lost the Mysql script files so there will be no data schema if you want to clone it as deploy!
# Technology
## Front-end
- I currently using ReactJS library for building users interfaces.
- Material-UI framework in mostly Component but not using Redux(Hook instead!) for state management.
- The React-code is still not fully optimized yet due to the limit of time.
## Back-end
- The mainly server-side is Nodejs, using express as routes definition.
- Mysql as RDBMS: the DB only save audio files path as string NOT files.
- Redis is used as cache(views).
  - How could we retrieve/sorts the views as desc with different types ? ex: get the 5 most views song/album/playlist in this day/month/year.
  - Incase there are atleast 3 milion songs, we have to save/request data(views) fast enough, right!
  - The Key in Redis: view:type:periodicity:timeFormat, ex: "view:song:monthly:2021-1".
  - Time complexity: O(log(N) + M) with N, M: number of keys and elements returned.
- The recommandation system(RS) using CNN algorithms only focusing on NLP major(Natural Language Processing).
  - There are 2 labels: joy, sadness
  - When users give input as text to the RS, RS will return one of above labels and show the songs/albums that its label match RS output.
  - The predictions is below 80% due to many reasons.
  - This recommandation system is for research purposes only with limit data and structure.
- Payment with BaoKim API.
# Demo
Here are some pictures as demo before i lost Mysql Schema/data.

Homepage
![image45](https://user-images.githubusercontent.com/34602549/109509413-7126fa00-7ad3-11eb-9fe8-bf80eb417be3.png)

Sign-in and Sign-up

![unnamed (3)](https://user-images.githubusercontent.com/34602549/109509550-9582d680-7ad3-11eb-9714-2e6337486cc2.png)

Listen the song

![unnamed (2)](https://user-images.githubusercontent.com/34602549/109509598-a0d60200-7ad3-11eb-968e-8cf9d26c91a1.png)

Create playlist

![unnamed](https://user-images.githubusercontent.com/34602549/109509635-adf2f100-7ad3-11eb-8015-5395a26158e9.png)

Recommand songs with emotions.

![unnamed (6)](https://user-images.githubusercontent.com/34602549/109509815-e2ff4380-7ad3-11eb-9ff6-bcd724df28ba.png)

Payment

![unnamed (7)](https://user-images.githubusercontent.com/34602549/109509908-fc07f480-7ad3-11eb-812f-34d86e43c9bc.png)




