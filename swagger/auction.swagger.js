/**
 * @swagger
 * tags:
 *  - name: auction
 *    description: 실시간 경매 관련 API ( 1 -> 2 -> 3 순으로 작동되어야 함 )
 * 
 */

/**
 * @swagger
 * paths:
 *   /auction/{itemId}:
 *     post:
 *       tags:
 *         - auction
 *       summary: 1. 경매 시작 API
 *       description: > 
 *                  1. 경매가 시작되면 auctioning 테이블에 itmeId와 price값을 삽입 <br>
 *                  처음에는 buyerId가 없고 추후에 추가된다. <br>
 *                  price는 auction에서 startPrice값을 가져온다. <br>
 *                  auction의 state 값도 변경하기
 *       parameters:
 *         - name: state
 *           in: path
 *           required: true
 *           description: 경매 아이템의 아이디 ( itmeId )
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: >
 *              경매가 시작되었습니다. <br>
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itmeId:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: integer
 *                       example: 1000000
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
 *     put:
 *       tags:
 *         - auction
 *       summary: 2. 입찰 API
 *       description: > 
 *                  2. 입찰을 누를때마다 auctioning 테이블의 데이터에 계속 수정 <br>
 * 
 *       parameters:
 *         - name: state
 *           in: path
 *           required: true
 *           description: 경매 아이템의 아이디 ( itmeId )
 *           schema:
 *             type: integer
 *             example: 1
 *       requestBody:
 *         description: 
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 buyerId:
 *                   type: integer
 *                   example: 10
 *                 price:
 *                   type: integer
 *                   example: 100000
 *       responses:
 *         '200':
 *           description: >
 *              성공적으로 입찰 되었습니다. <br>
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     buyerId:
 *                       type: integer
 *                       example: 10
 *                     price:
 *                       type: integer
 *                       example: 100000
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
 *           description: "경매 물품 없음"
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
 * 
 *     delete:
 *       tags:
 *         - auction
 *       summary: 3. auctioning 테이블 데이터 삭제 API
 *       description: > 
 *                  3. 입찰 완료시 auctionHistory 테이블에 삽입, auction 테이블 수정 ( endTime, endPrice )
 *       parameters:
 *         - name: state
 *           in: path
 *           required: true
 *           description: 경매 아이템의 아이디 ( itmeId )
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: >
 *              성공적으로 삭제가 완료되었습니다. <br>
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     buyerId:
 *                       type: integer
 *                       example: 10
 *                     price:
 *                       type: integer
 *                       example: 100000
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
 *           description: "경매 물품 없음"
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