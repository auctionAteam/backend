/**
 * @swagger
 * tags:
 *   - name: items
 *     description: 물품 관련 API
 */

// items
/** 
 * @swagger
 * paths:
 *   /items:
 *     get:
 *       tags:
 *         - items
 *       summary: 메인 페이지 물건 전체 조회
 *       description: > 
 *                  메인 페이지에서 모든 경매 물건을 조회하여 보여줍니다. <br>
 *                  필터를 사용시 바디에 state를 추가해주세요 <br>
 *                  before : 경매 전 ,auction : 경매 중,closed : 경매 완료
 *       requestBody:
 *         description: 
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limit:
 *                   type: integer
 *                   example: "3"
 *                 currentPage:
 *                   type: integer
 *                   example: "3"
 *       responses:
 *         '200':
 *           description: >
 *              모든 물건이 제공됩니다. <br>
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     img:
 *                       type: url
 *                       example: "1이미지의 주소, 썸네일이미지"
 *                     name:
 *                       type: string
 *                       example: "1이미지의 이름"
 *                     startTime:
 *                       type: timestamp
 *                       example: "2025-06-01 12:00:00"
 *                     startPrice:
 *                       type: integer
 *                       example: 200000
 *                     priceUnit:
 *                       type: integer
 *                       example: 10000
 *         '400':
 *           description: "데이터 누락 또는 형식 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "전달 데이터를 다시 확인해주세요."
 *         '404':
 *           description: 경매 물품 없음
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "물품이 존재하지 않습니다."
 *         '500':
 *           description: "서버 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."
 *     post:
 *       tags:
 *         - items
 *       summary: 물건 등록
 *       description: > 
 *                  물품 등록 페이지에서 등록하기 <br>
 *                  day에 몇일르 작성 1,2,3 등등 <br>
 *                  아직 img 추가 안됨 <br>
 *                  state는 자동으로 before로 저장 <br>
 *                  startTime은 물건을 등록한 날에서 day를 더한 값으로 삽입
 *       requestBody:
 *         description: 
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "user123@naver.com"
 *                 name:
 *                   type: string
 *                   example: "도자기"
 *                 day:
 *                   type: integer
 *                   example: 3
 *                 startPrice:
 *                   type: interger
 *                   example: 1000000
 *                 priceUnit:
 *                   type: interger
 *                   example: 10000
 *                 size:
 *                   type: string 
 *                   example: "세로 : 100, 가로 : 200"
 *                 infomation:
 *                   type: string
 *                   example: "고려시대에 만들어진 도자기이다."
 *       responses:
 *         '200':
 *           description: >
 *              물건이 등록되었습니다. <br>
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   userid:
 *                     type: string
 *                     example: "user123"
 *                   name:
 *                     type: string
 *                     example: "도자기"
 *                   startTime:
 *                     type: timestamp
 *                     example: "2025-06-01"
 *                   day:
 *                     type: integer
 *                     example: 604800
 *                   startPrice:
 *                     type: interger
 *                     example: 1000000
 *                   priceUnit:
 *                     type: interger
 *                     example: 10000
 *                   size:
 *                     type: string 
 *                     example: "세로 : 100, 가로 : 200"
 *                   infomation:
 *                     type: string
 *                     example: "고려시대에 만들어진 도자기이다."
 *                   state:
 *                     type: string
 *                     enum: [before,auction, closed]
 *         '400':
 *           description: "데이터 누락 또는 형식 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "전달 데이터를 다시 확인해주세요."
 *         '500':
 *           description: "서버 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."
 */

// items/{itemId}
/** 
 * @swagger
 * paths: 
 *   /items/{itemId}:
 *     get:
 *       tags:
 *         - items
 *       summary: 물건 상세 페이지
 *       description: > 
 *                  물건의 상세한 정보를 알려준다. <br>
 *                  before : 경매 전 ,auction : 경매 중,closed : 경매 완료
 *       parameters:
 *         - in: path
 *           name: itemId
 *           required: true
 *           description: 관심 추가한 아이템 ID ( itemId )
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: >
 *              필터링된 물품을 보여준다. <br>
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 10
 *                     img:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "URL주소1"
 *                     name:
 *                       type: string
 *                       example: "1이미지의 이름"
 *                     startTime:
 *                       type: timestamp
 *                       example: "2025-06-01 12:00:00"
 *                     startPrice:
 *                       type: integer
 *                       example: 200000
 *                     priceUnit:
 *                       type: integer
 *                       example: 10000
 *                     size:
 *                       type: string
 *                       example: "물건의 크기"
 *                     information:
 *                       type: string
 *                       example: "물건의 대한 정보"
 *                     state:
 *                       type: string
 *                       enum: [before,auction,closed]
 *         '400':
 *           description: "데이터 누락 또는 형식 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "전달 데이터를 다시 확인해주세요."
 *         '404':
 *           description: 경매 물품 없음
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "물품이 존재하지 않습니다."
 *         '500':
 *           description: "서버 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."
 *     post:
 *       tags:
 *         - items
 *       summary: 유저가 물건을 관심 물건으로 추가한다.
 *       description: > 
 *                  버튼을 누르면 item테이블에 추가한다. <br>
 *       parameters:
 *         - name: state
 *           in: path
 *           required: true
 *           description: 관심 추가한 아이템 ID ( itemId )
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: >
 *              관심 아이템으로 추가되었습니다. <br>
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 23
 *         '400':
 *           description: "데이터 누락 또는 형식 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "전달 데이터를 다시 확인해주세요."
 *         '404':
 *           description: "해당 유저 없음"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "유저가 존재하지 않습니다."
 *         '500':
 *           description: "서버 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."
 */