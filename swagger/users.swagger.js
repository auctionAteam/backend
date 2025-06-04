/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: 유저 관련 API
 * 
 * paths:
 *   /users/login:
 *     post:
 *       tags:
 *         - Users
 *       summary: 유저 로그인
 *       description: 로그인 버튼 클릭 시 호출
 *       requestBody:
 *         description: 로그인 정보 (아이디, 비밀번호)
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loginId:
 *                   type: string
 *                   example: "user123"
 *                 password:
 *                   type: string
 *                   example: "password123!"
 *       responses:
 *         '200':
 *           description: 로그인 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   login_id:
 *                     type: string
 *                     example: "abc123"
 *                   password:
 *                     type: string
 *                     example: "WDPlF+ZUOjg+sQ=="
 *                   phoneNum:
 *                     type: string
 *                     example: "010-1234-1234"
 *                   email:
 *                     type: string
 *                     example: "goob@naver.com"
 *                   salt:
 *                     type: string
 *                     example: "JhcXxhUrAFQ3yg=="
 *                   created_at:
 *                     type: integer
 *                     example: "2025-04-23 12:20:28"
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
 *         '401':
 *           description: "아이디나 비밀번호가 일치하지 않음 또는 존재하지 않는 회원"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "아이디 또는 비밀번호를 다시 확인해주세요."
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
 *         default:
 *           description: "예상치 못한 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "예기치 않은 오류가 발생했습니다."
 * 
 *   /users/join:
 *     post:
 *       tags:
 *         - Users
 *       summary: 회원가입
 *       description: 회원가입 버튼 클릭 시 호출
 *       requestBody:
 *         description: 회원가입에 필요한 정보 (아이디, 비밀번호, 주소)
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loginId:
 *                   type: string
 *                   example: "user123"
 *                 password:
 *                   type: string
 *                   example: "password123!"
 *                 name:
 *                   type: string
 *                   example: "홍길동"
 *                 phoneNum:
 *                   type: string
 *                   example: "010-1234-1264"
 *                 email:
 *                   type: string
 *                   example: "goob@naver.com"
 *                 address:
 *                   type: string
 *                   example: "서울 용산구 한강대로 405"
 *       responses:
 *         '201':
 *           description: 회원가입 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 회원가입 되었습니다."
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
 *         '409':
 *           description: "이미 존재하는 아이디"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "이미 존재하는 아이디입니다."
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
 *         default:
 *           description: "예상치 못한 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "예기치 않은 오류가 발생했습니다."
 *   /users/info:
 *     get:
 *       tags:
 *         - Users
 *       summary: 내 정보 조회
 *       description: 마이 페이지의 내 정보 조회
 *       requestBody:
 *         description: 유저 아이디
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loginId:
 *                   type: string
 *                   example: "user123"
 *       responses:
 *         '201':
 *           description: 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   loginId:
 *                     type: string
 *                     example: "user123"
 *                   name:
 *                     type: string
 *                     example: "홍길동"
 *                   address:
 *                     type: string
 *                     example: "서울 용산구 한강대로 405"
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
 *         default:
 *           description: "예상치 못한 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "예기치 않은 오류가 발생했습니다."
 * 
 *   /users/item:
 *     get:
 *       tags:
 *         - Users
 *       summary: 마이페이지에서 입찰전, 입찰중, 입찰후 등의 상태에 따른 물건의 정보 조회
 *       description: > 
 *                  마이페이지에서 필터를 거쳐서 경매 물건을 조회하여 보여줍니다. <br>
 *                  body에 state가 없으면 전부다 보여줍니다.
 *       requestBody:
 *         description: 
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userid:
 *                   type: string
 *                   example: "user123"
 *                 state:
 *                   type: string
 *                   enum: [active, sold, closed]
 *                 limit:
 *                   type: integer
 *                   example: "3"
 *                 currentPage:
 *                   type: integer
 *                   example: "3"
 *       responses:
 *         '200':
 *           description: >
 *              필터링된 물건이 제공됩니다. <br>
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
 */
