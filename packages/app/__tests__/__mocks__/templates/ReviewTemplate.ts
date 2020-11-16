/**
 * @file JSON Template - Product Review
 * @module tests/mocks/templates/Review
 * @see https://www.json-generator.com/
 */

export default {
  body: '{{lorem(1, "paragraphs")}}',
  created_at: new Date().valueOf(),
  customer_id:
    '{{random(4259527393435, 4259527262363, 4259527065755, 4259526901915, 4259526770843, 4259526672539, 4259526541467, 4259526410395, 4259526279323, 4259526148251)}}',
  id: '{{objectId()}}',
  product_handle: '',
  product_id: '{{random(5664609534107, 5665197424795, 5664639090843)}}',
  product_image_url: '',
  product_sku: '',
  product_title: '',
  product_url: '',
  published: true,
  rating: '{{random(1, 2, 3, 4, 5)}}',
  title: '{{lorem(3, "words")}}'
}
