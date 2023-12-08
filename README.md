PROJECT MPP 

CLIENT    - REACT 
SERVER    - NODE.JS
DB        - MongoDB


client > npm start
server > npm run backend

# 현재 진행사항 
> Login 구현 완료,
> sign up 구현 완료
> post 구현완료
> 

# 문제점
> docker containers 구현시 proxy 
> 저장시 local과 호환 ? 

# 구현 해야할 목록 
> mypage 
> 사진저장
> post 저장 
> post 상세 
> settings 

# Docker 
> 명령어
> docker build .  // dockerfile 을 기준으로 이미지파일 생성
> docker build -t client-image // client-image 로 dockerfile image 생성
> docker run -d --name client-image clinet // docker 이미지 실행 

> $ pjt_mpp > docker-compose up --build -d  // docker-compose.yml 파일에 있는 dockerfile 실행시켜줌 
