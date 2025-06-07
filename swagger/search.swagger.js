/**
 * @swagger
 * tags:
 *   - name: search
 *     description: 검색 API
 */

// items
/** 
 * @swagger
 * paths:
 *   /search/{name}:
 *     get:
 *       tags:
 *         - search
 *       summary: 메인 페이지 물건 검색
 *       description: > 
 *                  메인 페이지의 검색창에서 검색한 결과값을 보여줍니다. <br>
 *                  ex) 시계 를 입력시 등록된 아이템중 이름에 시계가 들어가면 다 가져온다.
 *       parameters:
 *         - name: name
 *           in: path
 *           required: true
 *           description: 검색할 단어
 *           schema:
 *             type: string
 *             example: "시계"
 *         - name: limit
 *           in: query
 *           required: true
 *           description: 한 페이지에 보여줄 갯수
 *           schema:
 *             type: integer
 *             example: "10"
 *         - name: currentpage
 *           in: query
 *           required: true
 *           description: 현재 페이지
 *           schema:
 *             type: integer
 *             example: "2"
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
 */
