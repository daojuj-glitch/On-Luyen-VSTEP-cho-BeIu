/* Ôn Luyện VSTEP cho BéIu — dữ liệu học.
   Nguồn duy nhất: tests/ai-coordination/VSTEP/nguon/tu-vung.txt
   Bảng hiệu đính: tests/ai-coordination/VSTEP/docs/SPEC.md mục 5.
   Script thường: trình duyệt dùng window.VSEP_DATA, Node dùng module.exports. */
(function () {
  'use strict';

  function slug(s) {
    return String(s)
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  var topics = [
    { id: 'so-thich-the-thao', vi: 'Sở thích & thể thao', en: 'Hobbies and sports', kind: 'vocab' },
    { id: 'gia-dinh', vi: 'Gia đình', en: 'Family', kind: 'vocab' },
    { id: 'du-lich', vi: 'Đi lại & du lịch', en: 'Travel and tourism', kind: 'vocab' },
    { id: 'an-uong', vi: 'Ăn uống', en: 'Food and eating habits', kind: 'vocab' },
    { id: 'giai-tri', vi: 'Giải trí', en: 'Entertainment', kind: 'vocab' },
    { id: 'thoi-trang-mua-sam', vi: 'Thời trang & mua sắm', en: 'Fashion and shopping', kind: 'vocab' },
    { id: 'noi-so-thich', vi: 'Nói về sở thích', en: 'Hobbies and interests', kind: 'speaking' },
    { id: 'noi-am-nhac', vi: 'Nói về âm nhạc', en: 'Music', kind: 'speaking' },
    { id: 'noi-phim', vi: 'Nói về phim', en: 'Movies', kind: 'speaking' },
    { id: 'noi-du-lich', vi: 'Nói về du lịch', en: 'Travelling', kind: 'speaking' },
    { id: 'noi-the-thao', vi: 'Nói về thể thao', en: 'Sports', kind: 'speaking' },
    { id: 'noi-doc-sach', vi: 'Nói về đọc sách', en: 'Reading', kind: 'speaking' },
    { id: 'noi-mua-sam', vi: 'Nói về mua sắm', en: 'Shopping', kind: 'speaking' },
    { id: 'noi-hoc-tap-cong-viec', vi: 'Nói về học tập, công việc', en: 'Study and work', kind: 'speaking' },
    { id: 'noi-que-huong', vi: 'Nói về quê hương', en: 'Hometown', kind: 'speaking' }
  ];

  var vocab = [];
  function add(topic, group, en, vi, alt, note) {
    vocab.push({
      id: topic + '-' + slug(en),
      topic: topic,
      group: group,
      en: en,
      alt: alt || [],
      vi: vi,
      note: note || ''
    });
  }

  /* ===== Sở thích & thể thao ===== */
  var G_PLAY = 'Những thứ mọi người thường chơi';
  var G_COLLECT = 'Những thứ mọi người thường sưu tầm';
  var G_INDOOR = 'Các hoạt động trong nhà';
  var G_OUTDOOR = 'Các hoạt động ngoài trời';
  var G_SPORT = 'Thể thao';
  var G_TAKE = 'Cách dùng take up / give up';

  add('so-thich-the-thao', 'Sở thích', 'hobbies', 'sở thích, hoạt động giải trí', ['pastimes', 'favorites', 'leisure activities']);
  add('so-thich-the-thao', G_PLAY, 'cards', 'chơi bài');
  add('so-thich-the-thao', G_PLAY, 'computer games', 'trò chơi điện tử');
  add('so-thich-the-thao', G_PLAY, 'chess', 'chơi cờ');
  add('so-thich-the-thao', G_PLAY, 'musical instruments', 'chơi nhạc cụ', [], 'guitar, piano');
  add('so-thich-the-thao', G_PLAY, 'sports', 'thể thao');
  add('so-thich-the-thao', G_PLAY, 'traditional games', 'chơi trò chơi dân gian');
  add('so-thich-the-thao', G_COLLECT, 'coins', 'đồng xu');
  add('so-thich-the-thao', G_COLLECT, 'stamps', 'tem thư');
  add('so-thich-the-thao', G_COLLECT, 'antiques', 'đồ cổ');
  add('so-thich-the-thao', G_COLLECT, 'CDs', 'đĩa CD');
  add('so-thich-the-thao', G_COLLECT, 'books', 'sách');
  add('so-thich-the-thao', G_INDOOR, 'listening to music', 'nghe nhạc');
  add('so-thich-the-thao', G_INDOOR, 'reading', 'đọc sách');
  add('so-thich-the-thao', G_INDOOR, 'sleeping', 'ngủ');
  add('so-thich-the-thao', G_INDOOR, 'baking', 'nướng bánh');
  add('so-thich-the-thao', G_INDOOR, 'watching movies', 'xem phim');
  add('so-thich-the-thao', G_INDOOR, 'cooking', 'nấu ăn');
  add('so-thich-the-thao', G_INDOOR, 'handicraft making', 'làm đồ thủ công mỹ nghệ');
  add('so-thich-the-thao', G_INDOOR, 'collecting', 'sưu tầm');
  add('so-thich-the-thao', G_INDOOR, 'dancing', 'khiêu vũ');
  add('so-thich-the-thao', G_INDOOR, 'surfing the Internet', 'lướt web');
  add('so-thich-the-thao', G_OUTDOOR, 'gardening', 'làm vườn');
  add('so-thich-the-thao', G_OUTDOOR, 'jogging', 'chạy bộ', [], 'go jogging');
  add('so-thich-the-thao', G_OUTDOOR, 'going to karaoke bar', 'đi hát karaoke');
  add('so-thich-the-thao', G_OUTDOOR, 'going to café', 'đi cà phê');
  add('so-thich-the-thao', G_OUTDOOR, 'travelling', 'du lịch');
  add('so-thich-the-thao', G_OUTDOOR, 'camping', 'cắm trại');
  add('so-thich-the-thao', G_OUTDOOR, 'going to the cinema', 'đi xem phim', ['going to movies']);
  add('so-thich-the-thao', G_OUTDOOR, 'hiking', 'đi bộ đường dài');
  add('so-thich-the-thao', G_OUTDOOR, 'hanging out with friends', 'gặp gỡ bạn bè');
  add('so-thich-the-thao', G_SPORT, 'tennis', 'tennis', [], 'play tennis');
  add('so-thich-the-thao', G_SPORT, 'basketball', 'bóng rổ', [], 'play basketball');
  add('so-thich-the-thao', G_SPORT, 'baseball', 'bóng chày', [], 'play baseball');
  add('so-thich-the-thao', G_SPORT, 'volleyball', 'bóng chuyền', [], 'play volleyball');
  add('so-thich-the-thao', G_SPORT, 'badminton', 'cầu lông', [], 'play badminton');
  add('so-thich-the-thao', G_SPORT, 'golf', 'gôn', [], 'play golf');
  add('so-thich-the-thao', G_SPORT, 'soccer', 'bóng đá', ['football'], 'play soccer');
  add('so-thich-the-thao', G_SPORT, 'table tennis', 'bóng bàn', [], 'play table tennis');
  add('so-thich-the-thao', G_SPORT, 'yoga', 'yoga', [], 'do yoga');
  add('so-thich-the-thao', G_SPORT, 'aerobics', 'thể dục thẩm mỹ', [], 'do aerobics');
  add('so-thich-the-thao', G_SPORT, 'martial arts', 'võ thuật', [], 'do martial arts');
  add('so-thich-the-thao', G_SPORT, 'judo', 'võ Judo', [], 'do judo');
  add('so-thich-the-thao', G_SPORT, 'karate', 'võ Karate', [], 'do karate');
  add('so-thich-the-thao', G_SPORT, 'meditation', 'thiền', [], 'do meditation');
  add('so-thich-the-thao', G_SPORT, 'swimming', 'bơi lội', [], 'go swimming');
  add('so-thich-the-thao', G_SPORT, 'running', 'chạy', [], 'go running');
  add('so-thich-the-thao', G_SPORT, 'skiing', 'trượt tuyết', [], 'go skiing');
  add('so-thich-the-thao', G_SPORT, 'mountain climbing', 'leo núi', [], 'go mountain climbing');
  add('so-thich-the-thao', G_SPORT, 'sailing', 'chèo thuyền', [], 'go sailing');
  add('so-thich-the-thao', G_SPORT, 'cycling', 'đi xe đạp', [], 'go cycling');
  add('so-thich-the-thao', G_TAKE, 'take up', 'bắt đầu tham gia', [], 'take up + sở thích: bắt đầu tham gia một sở thích');
  add('so-thich-the-thao', G_TAKE, 'give up', 'ngừng chơi', [], 'give up = stop: ngừng chơi một sở thích');

  /* ===== Gia đình ===== */
  var G_REL = 'Họ hàng';
  var G_FAM = 'Từ vựng';

  add('gia-dinh', G_REL, 'grandfather', 'ông');
  add('gia-dinh', G_REL, 'grandmother', 'bà');
  add('gia-dinh', G_REL, 'uncle', 'chú, bác, cậu');
  add('gia-dinh', G_REL, 'aunt', 'cô, dì, bác gái');
  add('gia-dinh', G_REL, 'cousin', 'anh chị em họ');
  add('gia-dinh', G_REL, 'nephew', 'cháu trai (con của anh chị em)');
  add('gia-dinh', G_REL, 'niece', 'cháu gái (con của anh chị em)');
  add('gia-dinh', G_REL, 'father-in-law', 'bố chồng, bố vợ');
  add('gia-dinh', G_REL, 'mother-in-law', 'mẹ chồng, mẹ vợ');
  add('gia-dinh', G_REL, 'brother-in-law', 'anh rể, em rể, anh em bên vợ hoặc chồng');
  add('gia-dinh', G_REL, 'sister-in-law', 'chị dâu, em dâu, chị em bên vợ hoặc chồng');
  add('gia-dinh', G_REL, 'widower', 'người đàn ông góa vợ');
  add('gia-dinh', G_REL, 'widow', 'người phụ nữ góa chồng');
  add('gia-dinh', G_REL, 'step-father', 'bố dượng');
  add('gia-dinh', G_REL, 'step-mother', 'mẹ kế');
  add('gia-dinh', G_FAM, 'nuclear family', 'gia đình hạt nhân');
  add('gia-dinh', G_FAM, 'extended family', 'gia đình nhiều thế hệ');
  add('gia-dinh', G_FAM, 'DINK family', 'gia đình chỉ có bố mẹ chưa có con');
  add('gia-dinh', G_FAM, 'single-parent family', 'gia đình đơn thân');
  add('gia-dinh', G_FAM, 'get on well with', 'hòa thuận, hòa hợp');
  add('gia-dinh', G_FAM, 'have a lot in common', 'có nhiều điểm chung');
  add('gia-dinh', G_FAM, 'close-knit', 'thân thiết, gần gũi');
  add('gia-dinh', G_FAM, 'harmonious', 'hợp, hòa hợp');
  add('gia-dinh', G_FAM, 'immediate family', 'gia đình ruột thịt (bố mẹ, anh chị em, con)');
  add('gia-dinh', G_FAM, 'in-laws', 'họ hàng bên vợ hoặc chồng');
  add('gia-dinh', G_FAM, 'retired', 'nghỉ hưu');
  add('gia-dinh', G_FAM, 'make ends meet', 'xoay xở đủ sống');
  add('gia-dinh', G_FAM, 'breadwinner', 'trụ cột');
  add('gia-dinh', G_FAM, 'to be ready to do something', 'sẵn sàng làm gì');
  add('gia-dinh', G_FAM, 'single', 'độc thân');
  add('gia-dinh', G_FAM, 'proud', 'tự hào');
  add('gia-dinh', G_FAM, 'get married', 'kết hôn');
  add('gia-dinh', G_FAM, 'separated', 'li thân');
  add('gia-dinh', G_FAM, 'divorced', 'li dị');
  add('gia-dinh', G_FAM, 'remarried', 'tái hôn');
  add('gia-dinh', G_FAM, 'only child', 'con một');

  /* ===== Đi lại & du lịch ===== */
  var G_SIGHT = 'Ngắm cảnh';
  var G_TOURIST = 'Những thứ du khách thường làm trong kỳ nghỉ';
  var G_AIR = 'Hàng không';
  var G_TRAVEL = 'Cách dùng travel / trip / tour / journey / voyage';

  add('du-lich', G_SIGHT, 'cathedral', 'nhà thờ lớn');
  add('du-lich', G_SIGHT, 'pagoda', 'chùa');
  add('du-lich', G_SIGHT, 'souvenir shops', 'cửa hàng đồ lưu niệm');
  add('du-lich', G_SIGHT, 'bar', 'quán bar');
  add('du-lich', G_SIGHT, 'market', 'chợ');
  add('du-lich', G_SIGHT, 'temple', 'đền');
  add('du-lich', G_SIGHT, 'shopping center', 'trung tâm mua sắm');
  add('du-lich', G_SIGHT, 'tourist sites', 'khu du lịch');
  add('du-lich', G_SIGHT, 'fountain', 'đài phun nước');
  add('du-lich', G_SIGHT, 'statue', 'tượng');
  add('du-lich', G_SIGHT, 'entertainment center', 'trung tâm giải trí');
  add('du-lich', G_SIGHT, 'disco', 'sàn nhảy');
  add('du-lich', G_SIGHT, 'art galleries', 'triển lãm nghệ thuật');
  add('du-lich', G_SIGHT, 'night clubs', 'hộp đêm');
  add('du-lich', G_SIGHT, 'historical monument', 'di tích lịch sử');
  add('du-lich', G_SIGHT, 'national park', 'công viên quốc gia');
  add('du-lich', G_TOURIST, 'look round the shops', 'dạo xem các cửa hàng', ['have a look round the shops']);
  add('du-lich', G_TOURIST, 'go out in the evening', 'đi chơi bên ngoài vào buổi tối');
  add('du-lich', G_TOURIST, 'buy souvenirs', 'mua đồ lưu niệm');
  add('du-lich', G_TOURIST, 'spend a lot of money', 'tiêu nhiều tiền');
  add('du-lich', G_TOURIST, 'take photos', 'chụp ảnh');
  add('du-lich', G_TOURIST, 'get lost', 'bị lạc đường');
  add('du-lich', G_TOURIST, 'go sight-seeing', 'đi ngắm cảnh');
  add('du-lich', G_TOURIST, 'go shopping', 'đi mua sắm');
  add('du-lich', G_TOURIST, 'go sailing', 'chèo thuyền');
  add('du-lich', G_TOURIST, 'go surfing', 'lướt sóng');
  add('du-lich', G_TOURIST, 'go hiking', 'đi bộ đường dài');
  add('du-lich', G_TOURIST, 'sunbathe', 'tắm nắng');
  add('du-lich', G_TOURIST, 'go for a walk', 'đi dạo', ['go for a stroll']);
  add('du-lich', G_TOURIST, 'have a picnic', 'đi dã ngoại');
  add('du-lich', G_TOURIST, 'have a good time', 'vui vẻ');
  add('du-lich', G_AIR, 'check-in desk', 'quầy làm thủ tục');
  add('du-lich', G_AIR, 'luggage', 'hành lý');
  add('du-lich', G_AIR, 'excess baggage', 'hành lý quá cước');
  add('du-lich', G_AIR, 'boarding card', 'thẻ lên máy bay');
  add('du-lich', G_AIR, 'passport control', 'khu kiểm tra hộ chiếu');
  add('du-lich', G_AIR, 'departure lounge', 'phòng chờ lên máy bay');
  add('du-lich', G_AIR, 'duty-free', 'cửa hàng miễn thuế');
  add('du-lich', G_AIR, 'gate', 'cửa ra máy bay');
  add('du-lich', G_AIR, 'hand luggage', 'hành lý xách tay');
  add('du-lich', G_AIR, 'overhead locker', 'ngăn hành lý phía trên ghế');
  add('du-lich', G_AIR, 'runway', 'đường băng');
  add('du-lich', G_AIR, 'take off', 'cất cánh');
  add('du-lich', G_TRAVEL, 'travel', 'đi lại, du lịch', [], 'travel (V/N): chỉ sự dịch chuyển từ nơi này đến nơi khác');
  add('du-lich', G_TRAVEL, 'trip', 'chuyến đi', [], 'trip (n): chuyến đi đơn lẻ');
  add('du-lich', G_TRAVEL, 'tour', 'chuyến tour', [], 'tour (n): chuyến tour');
  add('du-lich', G_TRAVEL, 'journey', 'hành trình', [], 'journey (n): chuyến đi từ nơi này đến nơi khác');
  add('du-lich', G_TRAVEL, 'voyage', 'chuyến hành trình dài bằng tàu', [], 'voyage (n): hành trình dài bằng tàu');

  /* ===== Ăn uống ===== */
  var G_MEAT = 'Thịt, cá và nhuyễn thể';
  var G_VEG = 'Rau';
  var G_FRUIT = 'Trái cây';
  var G_DRINK = 'Đồ uống';
  var G_COOK = 'Các cách nấu nướng';
  var G_TASTE = 'Miêu tả thực phẩm';

  add('an-uong', G_MEAT, 'pork', 'thịt lợn');
  add('an-uong', G_MEAT, 'shrimp', 'tôm');
  add('an-uong', G_MEAT, 'eel', 'lươn');
  add('an-uong', G_MEAT, 'beef', 'thịt bò');
  add('an-uong', G_MEAT, 'crab', 'cua');
  add('an-uong', G_MEAT, 'oyster', 'hàu');
  add('an-uong', G_MEAT, 'chicken', 'thịt gà');
  add('an-uong', G_MEAT, 'mussels', 'con vẹm (trai biển)');
  add('an-uong', G_MEAT, 'seafood', 'thủy sản');
  add('an-uong', G_MEAT, 'lamb', 'thịt cừu');
  add('an-uong', G_MEAT, 'veal', 'thịt bê');
  add('an-uong', G_MEAT, 'duck', 'thịt vịt');
  add('an-uong', G_MEAT, 'cuttlefish', 'mực nang');
  add('an-uong', G_MEAT, 'carp', 'cá chép');
  add('an-uong', G_MEAT, 'poultry', 'gia cầm');
  add('an-uong', G_MEAT, 'sausages', 'xúc xích');
  add('an-uong', G_VEG, 'potato', 'khoai tây');
  add('an-uong', G_VEG, 'green beans', 'đậu que');
  add('an-uong', G_VEG, 'peas', 'đậu Hà Lan');
  add('an-uong', G_VEG, 'carrot', 'cà rốt');
  add('an-uong', G_VEG, 'cauliflower', 'súp lơ');
  add('an-uong', G_VEG, 'cabbage', 'bắp cải');
  add('an-uong', G_VEG, 'mushroom', 'nấm');
  add('an-uong', G_VEG, 'spinach', 'rau chân vịt (rau bina)');
  add('an-uong', G_VEG, 'lettuce', 'xà lách');
  add('an-uong', G_VEG, 'tomato', 'cà chua');
  add('an-uong', G_VEG, 'cucumber', 'dưa chuột');
  add('an-uong', G_VEG, 'aubergine', 'cà tím');
  add('an-uong', G_VEG, 'pumpkin', 'bí ngô');
  add('an-uong', G_VEG, 'sweetcorn', 'ngô ngọt');
  add('an-uong', G_FRUIT, 'apple', 'táo');
  add('an-uong', G_FRUIT, 'orange', 'cam');
  add('an-uong', G_FRUIT, 'lemon', 'chanh');
  add('an-uong', G_FRUIT, 'strawberry', 'dâu tây');
  add('an-uong', G_FRUIT, 'peach', 'đào');
  add('an-uong', G_FRUIT, 'melon', 'dưa lưới');
  add('an-uong', G_FRUIT, 'pear', 'quả lê');
  add('an-uong', G_FRUIT, 'banana', 'chuối');
  add('an-uong', G_FRUIT, 'grapes', 'nho');
  add('an-uong', G_FRUIT, 'pineapple', 'dứa');
  add('an-uong', G_FRUIT, 'cherry', 'quả anh đào');
  add('an-uong', G_FRUIT, 'mango', 'xoài');
  add('an-uong', G_FRUIT, 'grapefruit', 'quả bưởi');
  add('an-uong', G_FRUIT, 'plum', 'mận');
  add('an-uong', G_DRINK, 'fruit juice', 'nước ép trái cây');
  add('an-uong', G_DRINK, 'tea', 'trà');
  add('an-uong', G_DRINK, 'coffee', 'cà phê');
  add('an-uong', G_DRINK, 'beer', 'bia');
  add('an-uong', G_DRINK, 'wine', 'rượu vang');
  add('an-uong', G_DRINK, 'milk', 'sữa');
  add('an-uong', G_DRINK, 'Coke', 'Coca');
  add('an-uong', G_COOK, 'boil', 'luộc');
  add('an-uong', G_COOK, 'fry', 'rán');
  add('an-uong', G_COOK, 'grill', 'nướng vỉ');
  add('an-uong', G_COOK, 'bake', 'nướng lò');
  add('an-uong', G_COOK, 'stew', 'hầm');
  add('an-uong', G_COOK, 'steam', 'hấp');
  add('an-uong', G_COOK, 'stir fry', 'xào');
  add('an-uong', G_COOK, 'roast', 'quay');
  add('an-uong', G_TASTE, 'tasty', 'ngon', ['delicious', 'lovely', 'fantastic', 'nice']);
  add('an-uong', G_TASTE, 'awesome', 'rất ngon, tuyệt');
  add('an-uong', G_TASTE, 'fresh', 'tươi');
  add('an-uong', G_TASTE, 'salty', 'mặn');
  add('an-uong', G_TASTE, 'bland', 'nhạt');
  add('an-uong', G_TASTE, 'spicy', 'cay', ['hot']);
  add('an-uong', G_TASTE, 'bitter', 'đắng');
  add('an-uong', G_TASTE, 'fatty', 'béo');
  add('an-uong', G_TASTE, 'sour', 'chua');
  add('an-uong', G_TASTE, 'sweet', 'ngọt');
  add('an-uong', G_TASTE, 'healthy', 'khỏe mạnh');
  add('an-uong', G_TASTE, 'unhealthy', 'có hại cho sức khỏe');
  add('an-uong', G_TASTE, 'oily', 'nhiều dầu');
  add('an-uong', G_TASTE, 'nutritious', 'giàu dinh dưỡng');

  /* ===== Giải trí ===== */
  var G_FILM = 'Thể loại phim';
  var G_DESCRIBE = 'Miêu tả phim';
  var G_TV = 'Chương trình TV';
  var G_MUSIC = 'Loại nhạc';
  var G_PEOPLE = 'Người trong âm nhạc';
  var G_BOOK = 'Các loại sách';

  add('giai-tri', G_FILM, 'Western', 'phim cao bồi');
  add('giai-tri', G_FILM, 'comedy', 'phim hài');
  add('giai-tri', G_FILM, 'cartoon', 'phim hoạt hình');
  add('giai-tri', G_FILM, 'science fiction', 'khoa học viễn tưởng');
  add('giai-tri', G_FILM, 'action film', 'phim hành động');
  add('giai-tri', G_FILM, 'thriller', 'phim giật gân');
  add('giai-tri', G_FILM, 'horror film', 'phim kinh dị');
  add('giai-tri', G_FILM, 'love story', 'phim tình cảm', ['romantic film']);
  add('giai-tri', G_FILM, 'soap opera', 'phim dài tập');
  add('giai-tri', G_DESCRIBE, 'moving', 'cảm động');
  add('giai-tri', G_DESCRIBE, 'violent', 'bạo lực');
  add('giai-tri', G_DESCRIBE, 'powerful', 'mạnh mẽ, ấn tượng sâu sắc');
  add('giai-tri', G_DESCRIBE, 'funny', 'hài hước');
  add('giai-tri', G_DESCRIBE, 'blockbuster', 'bom tấn');
  add('giai-tri', G_DESCRIBE, 'classic', 'cổ điển');
  add('giai-tri', G_DESCRIBE, 'based on a book', 'chuyển thể từ sách');
  add('giai-tri', G_DESCRIBE, 'slow', 'chậm');
  add('giai-tri', G_DESCRIBE, 'subtitled', 'có phụ đề');
  add('giai-tri', G_DESCRIBE, 'dubbed', 'được lồng tiếng');
  add('giai-tri', G_DESCRIBE, 'beautifully filmed', 'cảnh quay đẹp');
  add('giai-tri', G_TV, 'wildlife program', 'chương trình về thế giới hoang dã');
  add('giai-tri', G_TV, 'travel program', 'chương trình du lịch');
  add('giai-tri', G_TV, 'arts program', 'chương trình nghệ thuật');
  add('giai-tri', G_TV, 'current affairs program', 'thời sự');
  add('giai-tri', G_TV, 'music program', 'chương trình âm nhạc');
  add('giai-tri', G_TV, 'sports program', 'chương trình thể thao');
  add('giai-tri', G_TV, 'educational program', 'chương trình giáo dục');
  add('giai-tri', G_TV, 'talk show', 'chương trình đối thoại trực tiếp');
  add('giai-tri', G_TV, 'drama', 'kịch', ['play']);
  add('giai-tri', G_TV, 'quiz show', 'hỏi đáp');
  add('giai-tri', G_TV, 'news', 'tin tức');
  add('giai-tri', G_TV, 'game show', 'trò chơi truyền hình');
  add('giai-tri', G_TV, 'documentary', 'phim tài liệu');
  add('giai-tri', G_TV, 'regional news', 'tin tức khu vực');
  add('giai-tri', G_TV, 'weather forecast', 'dự báo thời tiết');
  add('giai-tri', G_MUSIC, 'classical music', 'nhạc cổ điển');
  add('giai-tri', G_MUSIC, 'pop', 'nhạc pop');
  add('giai-tri', G_MUSIC, 'rock', 'nhạc rock');
  add('giai-tri', G_MUSIC, 'jazz', 'nhạc jazz');
  add('giai-tri', G_MUSIC, 'R&B', 'nhạc R&B');
  add('giai-tri', G_MUSIC, 'instrumental music', 'nhạc không lời');
  add('giai-tri', G_MUSIC, 'country music', 'nhạc đồng quê');
  add('giai-tri', G_MUSIC, 'folk song', 'dân ca');
  add('giai-tri', G_MUSIC, 'soft music', 'nhạc nhẹ');
  add('giai-tri', G_MUSIC, 'dance', 'nhạc nhảy');
  add('giai-tri', G_PEOPLE, 'composer', 'nhà soạn nhạc');
  add('giai-tri', G_PEOPLE, 'song writer', 'nhà sáng tác');
  add('giai-tri', G_PEOPLE, 'musician', 'nhạc công');
  add('giai-tri', G_PEOPLE, 'band', 'ban nhạc');
  add('giai-tri', G_PEOPLE, 'orchestra', 'dàn nhạc');
  add('giai-tri', G_PEOPLE, 'soloist', 'đơn ca');
  add('giai-tri', G_PEOPLE, 'guitarist', 'người chơi guitar');
  add('giai-tri', G_PEOPLE, 'lead singer', 'ca sỹ chính');
  add('giai-tri', G_PEOPLE, 'drummer', 'người chơi trống');
  add('giai-tri', G_PEOPLE, 'pianist', 'người chơi piano');
  add('giai-tri', G_PEOPLE, 'singer', 'ca sỹ');
  add('giai-tri', G_PEOPLE, 'dancer', 'vũ công');
  add('giai-tri', G_BOOK, 'novels', 'tiểu thuyết');
  add('giai-tri', G_BOOK, 'short stories', 'truyện ngắn');
  add('giai-tri', G_BOOK, 'poem', 'thơ');
  add('giai-tri', G_BOOK, 'detective story', 'tiểu thuyết trinh thám');
  add('giai-tri', G_BOOK, 'ghost stories', 'truyện ma');
  add('giai-tri', G_BOOK, 'magazines', 'tạp chí');
  add('giai-tri', G_BOOK, 'comic books', 'truyện tranh');
  add('giai-tri', G_BOOK, 'newspapers', 'báo');

  /* ===== Thời trang & mua sắm ===== */
  var G_CLOTHES = 'Các loại quần áo';
  var G_WEAR = 'Những thứ để mặc, đội';
  var G_COLOR = 'Màu sắc';
  var G_SHOP = 'Trong cửa hàng';
  var G_SHOPTYPE = 'Các loại cửa hàng';

  add('thoi-trang-mua-sam', G_CLOTHES, 'formal clothes', 'quần áo trang trọng');
  add('thoi-trang-mua-sam', G_CLOTHES, 'casual clothes', 'quần áo thông thường', ['informal clothes']);
  add('thoi-trang-mua-sam', G_CLOTHES, 'handmade clothes', 'quần áo may thủ công');
  add('thoi-trang-mua-sam', G_CLOTHES, 'ready-made clothes', 'quần áo may sẵn');
  add('thoi-trang-mua-sam', G_CLOTHES, 'Korean-style clothes', 'áo theo kiểu Hàn Quốc');
  add('thoi-trang-mua-sam', G_CLOTHES, 'traditional Vietnamese-style clothes', 'quần áo VN truyền thống');
  add('thoi-trang-mua-sam', G_WEAR, 'hat', 'mũ');
  add('thoi-trang-mua-sam', G_WEAR, 'cap', 'mũ lưỡi trai');
  add('thoi-trang-mua-sam', G_WEAR, 'conical hat', 'nón lá');
  add('thoi-trang-mua-sam', G_WEAR, 'beret', 'mũ mềm');
  add('thoi-trang-mua-sam', G_WEAR, 'woollen cap', 'mũ len');
  add('thoi-trang-mua-sam', G_WEAR, 'scarf', 'khăn');
  add('thoi-trang-mua-sam', G_WEAR, 'shirt', 'áo sơ mi');
  add('thoi-trang-mua-sam', G_WEAR, 'T-shirt', 'áo phông');
  add('thoi-trang-mua-sam', G_WEAR, 'blouse', 'áo cánh');
  add('thoi-trang-mua-sam', G_WEAR, 'dress', 'váy liền thân');
  add('thoi-trang-mua-sam', G_WEAR, 'skirt', 'chân váy');
  add('thoi-trang-mua-sam', G_WEAR, 'jeans', 'quần bò');
  add('thoi-trang-mua-sam', G_WEAR, 'shorts', 'quần ngắn');
  add('thoi-trang-mua-sam', G_WEAR, 'coat', 'áo khoác dài');
  add('thoi-trang-mua-sam', G_WEAR, 'jacket', 'áo khoác ngắn');
  add('thoi-trang-mua-sam', G_WEAR, 'suit', 'com lê');
  add('thoi-trang-mua-sam', G_WEAR, 'sweater', 'áo len cổ chui', ['jumper']);
  add('thoi-trang-mua-sam', G_WEAR, 'high-heel shoes', 'giày cao gót');
  add('thoi-trang-mua-sam', G_WEAR, 'tracksuit', 'quần áo ấm rộng để mặc thể thao');
  add('thoi-trang-mua-sam', G_WEAR, 'trousers', 'quần dài');
  add('thoi-trang-mua-sam', G_WEAR, 'tie', 'cà vạt');
  add('thoi-trang-mua-sam', G_WEAR, 'top', 'áo phía trên');
  add('thoi-trang-mua-sam', G_WEAR, 'socks', 'tất chân');
  add('thoi-trang-mua-sam', G_WEAR, 'tights', 'quần tất');
  add('thoi-trang-mua-sam', G_WEAR, 'boots', 'ủng, bốt');
  add('thoi-trang-mua-sam', G_WEAR, 'shoes', 'giày');
  add('thoi-trang-mua-sam', G_WEAR, 'sandals', 'dép quai hậu, xăng-đan');
  add('thoi-trang-mua-sam', G_WEAR, 'gloves', 'găng tay');
  add('thoi-trang-mua-sam', G_WEAR, 'trainers', 'giày thể thao');
  add('thoi-trang-mua-sam', G_WEAR, 'bracelet', 'vòng đeo tay');
  add('thoi-trang-mua-sam', G_WEAR, 'necklace', 'vòng đeo cổ');
  add('thoi-trang-mua-sam', G_WEAR, 'earrings', 'bông tai');
  add('thoi-trang-mua-sam', G_WEAR, 'belt', 'thắt lưng');
  add('thoi-trang-mua-sam', G_COLOR, 'pink', 'màu hồng');
  add('thoi-trang-mua-sam', G_COLOR, 'white', 'màu trắng');
  add('thoi-trang-mua-sam', G_COLOR, 'black', 'màu đen');
  add('thoi-trang-mua-sam', G_COLOR, 'yellow', 'màu vàng');
  add('thoi-trang-mua-sam', G_COLOR, 'purple', 'màu tía');
  add('thoi-trang-mua-sam', G_COLOR, 'navy blue', 'màu xanh hải quân (xanh đậm)');
  add('thoi-trang-mua-sam', G_COLOR, 'green', 'màu xanh lá cây');
  add('thoi-trang-mua-sam', G_COLOR, 'brown', 'màu nâu');
  add('thoi-trang-mua-sam', G_COLOR, 'bright', 'màu sáng');
  add('thoi-trang-mua-sam', G_COLOR, 'blue', 'màu xanh nước biển');
  add('thoi-trang-mua-sam', G_COLOR, 'light', 'màu nhạt');
  add('thoi-trang-mua-sam', G_COLOR, 'grey', 'màu xám');
  add('thoi-trang-mua-sam', G_COLOR, 'red', 'màu đỏ');
  add('thoi-trang-mua-sam', G_COLOR, 'orange', 'màu cam');
  add('thoi-trang-mua-sam', G_COLOR, 'violet', 'màu tím');
  add('thoi-trang-mua-sam', G_COLOR, 'dark', 'màu tối');
  add('thoi-trang-mua-sam', G_SHOP, 'shop assistant', 'người bán hàng');
  add('thoi-trang-mua-sam', G_SHOP, 'customers', 'khách hàng');
  add('thoi-trang-mua-sam', G_SHOP, 'service', 'dịch vụ');
  add('thoi-trang-mua-sam', G_SHOP, 'window shopping', 'đi ngắm hàng (không mua)');
  add('thoi-trang-mua-sam', G_SHOP, 'shopping list', 'danh sách mua sắm');
  add('thoi-trang-mua-sam', G_SHOP, 'convenient', 'tiện ích');
  add('thoi-trang-mua-sam', G_SHOP, 'helpful', 'nhiệt tình, hay giúp đỡ');
  add('thoi-trang-mua-sam', G_SHOP, 'various', 'nhiều loại');
  add('thoi-trang-mua-sam', G_SHOP, 'colourful', 'đầy màu sắc');
  add('thoi-trang-mua-sam', G_SHOPTYPE, 'department store', 'cửa hàng bách hóa');
  add('thoi-trang-mua-sam', G_SHOPTYPE, 'supermarket', 'siêu thị');
  add('thoi-trang-mua-sam', G_SHOPTYPE, "newsagent's", 'quầy bán báo');
  add('thoi-trang-mua-sam', G_SHOPTYPE, "butcher's", 'cửa hàng thịt');
  add('thoi-trang-mua-sam', G_SHOPTYPE, "chemist's", 'cửa hàng thuốc tây');
  add('thoi-trang-mua-sam', G_SHOPTYPE, "greengrocer's", 'cửa hàng rau quả');
  add('thoi-trang-mua-sam', G_SHOPTYPE, 'boutique', 'cửa hàng bán quần áo', ['clothing store']);
  add('thoi-trang-mua-sam', G_SHOPTYPE, 'stationery', 'cửa hàng văn phòng phẩm');
  add('thoi-trang-mua-sam', G_SHOPTYPE, 'shoe shop', 'cửa hàng giày');
  add('thoi-trang-mua-sam', G_SHOPTYPE, 'bookshop', 'cửa hàng sách');

  /* ===== Nói về sở thích ===== */
  var S = 'noi-so-thich';
  add(S, 'Cụm từ hay', 'release my pressure', 'giải tỏa áp lực');
  add(S, 'Cụm từ hay', 'ease my stress', 'bớt căng thẳng');
  add(S, 'Cụm từ hay', 'keep fit', 'giữ dáng');
  add(S, 'Cụm từ hay', 'keep in good shape', 'có vóc dáng đẹp');
  add(S, 'Cụm từ hay', 'live a well-balanced life', 'sống cân bằng');
  add(S, 'Cụm từ hay', 'boost family concord', 'tăng sự kết nối với gia đình');
  add(S, 'Cụm từ hay', 'maintain bonds with friends and family members', 'duy trì mối quan hệ với bạn bè và gia đình');
  add(S, 'Cụm từ hay', 'catch up on gossip', 'tán gẫu với bạn thân');
  add(S, 'Cụm từ hay', 'go window-shopping', 'dạo phố');
  add(S, 'Cụm từ hay', 'play video games', 'chơi trò chơi điện tử');

  /* ===== Nói về âm nhạc ===== */
  S = 'noi-am-nhac';
  add(S, 'Cụm từ hay', 'cheer me up', 'làm tôi phấn khởi');
  add(S, 'Cụm từ hay', 'calm myself down', 'tĩnh tâm lại');
  add(S, 'Cụm từ hay', 'indispensable part', 'một phần không thể thiếu');
  add(S, 'Cụm từ hay', 'blow my mind', 'làm đầu óc sảng khoái');
  add(S, 'Cụm từ hay', 'strong beats and rhythms', 'những giai điệu mạnh mẽ');
  add(S, 'Cụm từ hay', 'wake me up', 'đánh thức tôi dậy');
  add(S, 'Cụm từ hay', 'feel drowsy', 'còn ngái ngủ');
  add(S, 'Cụm từ hay', 'light music', 'nhạc nhẹ');
  add(S, 'Cụm từ hay', 'earphones', 'tai nghe');
  add(S, 'Cụm từ hay', 'public transport', 'phương tiện công cộng');
  add(S, 'Cụm từ hay', 'no exception', 'không phải là ngoại lệ');
  add(S, 'Cụm từ hay', 'not my cup of tea', 'không phải là sở thích của tôi');

  /* ===== Nói về phim ===== */
  S = 'noi-phim';
  add(S, 'Cụm từ hay', 'big fan', 'fan bự');
  add(S, 'Cụm từ hay', 'visual effects', 'hiệu ứng hình ảnh');
  add(S, 'Cụm từ hay', 'sound effects', 'hiệu ứng âm thanh');
  add(S, 'Cụm từ hay', 'bestie', 'bạn thân');
  add(S, 'Cụm từ hay', 'a better atmosphere', 'bầu không khí tốt hơn');
  add(S, 'Cụm từ hay', 'escape from daily life', 'thoát khỏi sinh hoạt thường nhật');
  add(S, 'Cụm từ hay', 'broaden my horizon', 'mở rộng tầm nhìn');
  add(S, 'Cụm từ hay', 'enrich my knowledge', 'làm giàu kiến thức');
  add(S, 'Cụm từ hay', 'provoke thought', 'giúp hiểu hơn về nhân sinh quan');
  add(S, 'Cụm từ hay', 'boost my imagination', 'tăng cường trí tưởng tượng');
  add(S, 'Cụm từ hay', 'childhood interest', 'niềm vui ngày thơ bé');

  /* ===== Nói về du lịch ===== */
  S = 'noi-du-lich';
  add(S, 'Cụm từ hay', 'a sense of freshness', 'cảm giác mới lạ');
  add(S, 'Cụm từ hay', 'escape from daily life routines', 'thoát khỏi sinh hoạt thường nhật');
  add(S, 'Cụm từ hay', 'lifelong dream', 'giấc mơ lâu dài');
  add(S, 'Cụm từ hay', 'round-the-world tour', 'du lịch vòng quanh thế giới');
  add(S, 'Cụm từ hay', 'overseas life', 'cuộc sống nước ngoài');
  add(S, 'Cụm từ hay', 'experience another culture', 'trải nghiệm nền văn hóa khác nhau');
  add(S, 'Cụm từ hay', 'try different food', 'thử món ăn khác nhau');
  add(S, 'Cụm từ hay', 'make trips', 'thực hiện chuyến đi');
  add(S, 'Cụm từ hay', 'ancient towns', 'phố cổ');

  /* ===== Nói về thể thao ===== */
  S = 'noi-the-thao';
  add(S, 'Cụm từ hay', 'release my pressure', 'giải tỏa áp lực');
  add(S, 'Cụm từ hay', 'release study burdens', 'giảm gánh nặng học tập');
  add(S, 'Cụm từ hay', 'ease tiredness', 'bớt mệt mỏi');
  add(S, 'Cụm từ hay', 'keep in good shape', 'giữ dáng');
  add(S, 'Cụm từ hay', 'build my body', 'rèn luyện cơ thể');
  add(S, 'Cụm từ hay', 'strengthen teamwork spirit', 'tăng cường tinh thần đồng đội');
  add(S, 'Cụm từ hay', 'improve co-operation skills', 'cải thiện các kỹ năng hợp tác');
  add(S, 'Cụm từ hay', 'socialise with my peers', 'giao tiếp với bạn đồng trang lứa');
  add(S, 'Cụm từ hay', 'a sense of competition', 'ý thức thi đua');
  add(S, 'Cụm từ hay', 'winning and losing', 'chiến thắng và thất bại');
  add(S, 'Cụm từ hay', 'basketball court', 'sân bóng rổ');
  add(S, 'Cụm từ hay', 'stadium', 'sân vận động');

  /* ===== Nói về đọc sách ===== */
  S = 'noi-doc-sach';
  add(S, 'Cụm từ hay', 'keep up with the latest news', 'cập nhật tin tức');
  add(S, 'Cụm từ hay', 'cultivate my way of thinking', 'rèn luyện tư duy');
  add(S, 'Cụm từ hay', 'enlighten my mind', 'khai sáng, mở mang đầu óc');
  add(S, 'Cụm từ hay', 'set a fire in my mind', 'khai sáng, mở mang đầu óc');
  add(S, 'Cụm từ hay', 'add a bit of fun to my life', 'thêm chút niềm vui cho cuộc sống');
  add(S, 'Cụm từ hay', 'kill time', 'giết thời gian');
  add(S, 'Cụm từ hay', 'on a coach', 'trên xe khách');
  add(S, 'Cụm từ hay', 'broaden my horizon', 'mở rộng tầm nhìn');
  add(S, 'Cụm từ hay', 'enrich my knowledge', 'làm giàu kiến thức');
  add(S, 'Cụm từ hay', 'daily life', 'cuộc sống hằng ngày');

  /* ===== Nói về mua sắm ===== */
  S = 'noi-mua-sam';
  add(S, 'Cụm từ hay', 'shopaholic', 'người nghiện mua sắm');
  add(S, 'Cụm từ hay', 'daily necessities', 'những thứ cần thiết hằng ngày');
  add(S, 'Cụm từ hay', 'skin care products', 'sản phẩm chăm sóc da');
  add(S, 'Cụm từ hay', 'cosmetics', 'mĩ phẩm');
  add(S, 'Cụm từ hay', 'get a sense of satisfaction', 'có cảm giác thoải mái');
  add(S, 'Cụm từ hay', 'try on different clothes', 'mặc thử quần áo khác nhau');
  add(S, 'Cụm từ hay', 'catch up with the latest trend', 'theo kịp xu hướng thời trang mới nhất');
  add(S, 'Cụm từ hay', 'facilitate my daily life', 'giảm bớt những khó khăn trong sinh hoạt thường nhật');
  add(S, 'Cụm từ hay', 'new technologies', 'công nghệ mới');
  add(S, 'Cụm từ hay', 'grocery store', 'cửa hàng tạp hóa');

  /* ===== Nói về học tập, công việc ===== */
  S = 'noi-hoc-tap-cong-viec';
  add(S, 'Cụm từ hay', 'boost my people skills', 'nâng cao kỹ năng giao tiếp');
  add(S, 'Cụm từ hay', 'people skills', 'kỹ năng giao tiếp');
  add(S, 'Cụm từ hay', 'expand my social network', 'mở rộng quan hệ xã hội');
  add(S, 'Cụm từ hay', 'social network', 'quan hệ xã hội');
  add(S, 'Cụm từ hay', 'meet my requirements', 'đáp ứng các nhu cầu');
  add(S, 'Cụm từ hay', 'financial security', 'đảm bảo về tài chính');
  add(S, 'Cụm từ hay', 'promotion opportunity', 'cơ hội thăng tiến');
  add(S, 'Cụm từ hay', 'self-improvement', 'hoàn thiện bản thân');
  add(S, 'Cụm từ hay', 'major in', 'học chuyên ngành');
  add(S, 'Cụm từ hay', 'fresh graduate', 'sinh viên vừa mới tốt nghiệp');
  add(S, 'Cụm từ hay', 'language center', 'trung tâm ngoại ngữ');

  /* ===== Nói về quê hương ===== */
  S = 'noi-que-huong';
  add(S, 'Cụm từ hay', 'hometown', 'quê hương');
  add(S, 'Cụm từ hay', 'metropolis', 'thành phố lớn');
  add(S, 'Cụm từ hay', 'dwellers', 'cư dân');
  add(S, 'Cụm từ hay', 'well-developed facilities', 'những tiện ích rất tiên tiến');
  add(S, 'Cụm từ hay', 'natural landscape', 'cảnh thiên nhiên tươi đẹp');
  add(S, 'Cụm từ hay', 'worldwide reputation', 'nổi tiếng khắp thế giới');
  add(S, 'Cụm từ hay', 'stunning ocean views', 'cảnh biển tuyệt đẹp');
  add(S, 'Cụm từ hay', 'monotonous', 'nhàm chán');
  add(S, 'Cụm từ hay', 'entertainment options', 'sự lựa chọn để giải trí');
  add(S, 'Cụm từ hay', 'job-hunting', 'tìm việc');
  add(S, 'Cụm từ hay', 'well-paid job', 'công việc được trả lương tốt');
  add(S, 'Cụm từ hay', 'young people', 'giới trẻ');

  /* ===== Mẫu câu ===== */
  var structures = [
    { id: 'st-hobby-1', topic: 'so-thich-the-thao', en: 'In my free/spare time, I often + V…', vi: 'Thời gian rảnh tôi thường…' },
    { id: 'st-hobby-2', topic: 'so-thich-the-thao', en: "I'm interested in/keen on/fond of/excited about/passionate about + N/V-ing", vi: 'Tôi thích, đam mê…' },
    { id: 'st-hobby-3', topic: 'so-thich-the-thao', en: 'I love … best because …', vi: 'Tôi thích … nhất bởi vì…' },
    { id: 'st-hobby-4', topic: 'so-thich-the-thao', en: 'I like/enjoy + N/V-ing', vi: 'Tôi thích…' },
    { id: 'st-hobby-5', topic: 'so-thich-the-thao', en: "I dislike … because it's too …", vi: 'Tôi ghét … bởi vì nó quá…' },
    { id: 'st-hobby-6', topic: 'so-thich-the-thao', en: 'What I like most about … is that …', vi: 'Điều tôi thích nhất về… là…' },
    { id: 'st-hobby-7', topic: 'so-thich-the-thao', en: 'I prefer N/V-ing to N/V-ing because …', vi: 'Thích cái gì hơn cái gì' },
    { id: 'st-hobby-8', topic: 'so-thich-the-thao', en: 'My favourite activities/hobbies/pastimes are …', vi: 'Các hoạt động yêu thích của tôi là…' },
    { id: 'st-family-1', topic: 'gia-dinh', en: 'There are … members in my family. / My family has … people.', vi: 'Giới thiệu số lượng người trong nhà' },
    { id: 'st-family-2', topic: 'gia-dinh', en: 'My father/mother/sister is a/an + job', vi: 'Giới thiệu nghề nghiệp' },
    { id: 'st-family-3', topic: 'gia-dinh', en: 'My father/mother is … years old.', vi: 'Giới thiệu tuổi' },
    { id: 'st-family-4', topic: 'gia-dinh', en: 'My father/mother is the breadwinner of the family.', vi: 'Người trụ cột của gia đình' },
    { id: 'st-family-5', topic: 'gia-dinh', en: 'I often spend time + V-ing with my friends/family.', vi: 'Tôi thường dành thời gian…' },
    { id: 'st-family-6', topic: 'gia-dinh', en: 'I prefer staying with my family to staying with my friends.', vi: 'Thích ở với gia đình hơn…' },
    { id: 'st-film-1', topic: 'noi-phim', en: 'The film was set in …', vi: 'Bối cảnh của phim' },
    { id: 'st-film-2', topic: 'noi-phim', en: 'The main characters are …', vi: 'Diễn viên chính' },
    { id: 'st-film-3', topic: 'noi-phim', en: 'It was based on a novel by …', vi: 'Phim dựa vào tiểu thuyết của' },
    { id: 'st-film-4', topic: 'noi-phim', en: 'It was directed by …', vi: 'Được đạo diễn bởi' },
    { id: 'st-film-5', topic: 'noi-phim', en: 'It was filmed in …', vi: 'Phim được quay ở' },
    { id: 'st-film-6', topic: 'noi-phim', en: 'Kate Winslet played the part of …', vi: 'Đóng vai của…' },
    { id: 'st-film-7', topic: 'noi-phim', en: 'It was about …', vi: 'Phim nói về' },
    { id: 'st-film-8', topic: 'noi-phim', en: 'The film was nominated for 11 Oscars.', vi: 'Phim được đề cử' },
    { id: 'st-book-1', topic: 'noi-doc-sach', en: "It's a book by …", vi: 'Được viết bởi' },
    { id: 'st-book-2', topic: 'noi-doc-sach', en: "It's for children.", vi: 'Sách cho trẻ con' },
    { id: 'st-book-3', topic: 'noi-doc-sach', en: "It's called … / Its name is …", vi: 'Tên sách là…' },
    { id: 'st-book-4', topic: 'noi-doc-sach', en: 'It has been translated into …', vi: 'Được dịch sang' },
    { id: 'st-book-5', topic: 'noi-doc-sach', en: "It's about …", vi: 'Nội dung kể về…' },
    { id: 'st-book-6', topic: 'noi-doc-sach', en: 'It has been made into a film.', vi: 'Được làm thành phim' },
    { id: 'st-book-7', topic: 'noi-doc-sach', en: "It's set in …", vi: 'Bối cảnh…' },
    { id: 'st-book-8', topic: 'noi-doc-sach', en: 'The main characters are …', vi: 'Nhân vật chính' },
    { id: 'st-book-9', topic: 'noi-doc-sach', en: "It's based on a true story.", vi: 'Dựa vào câu chuyện thật' },
    { id: 'st-book-10', topic: 'noi-doc-sach', en: 'The main themes are love and selfishness.', vi: 'Chủ đề chính là tình yêu và sự ích kỷ' },
    { id: 'st-place-1', topic: 'noi-du-lich', en: 'The town is full of interesting places.', vi: 'Thành phố có đầy chỗ thú vị' },
    { id: 'st-place-2', topic: 'noi-du-lich', en: "Hanoi is beautiful but it's always packed with tourists in the summer.", vi: 'Đông đúc' },
    { id: 'st-place-3', topic: 'noi-du-lich', en: 'Many beautiful cities have become very touristy.', vi: 'Bị du lịch hóa quá' },
    { id: 'st-place-4', topic: 'noi-du-lich', en: 'Ho Chi Minh City is a really lively place and the night-life is fantastic.', vi: 'Sống động' }
  ];

  /* ===== Luyện nói ===== */
  var speaking = [
    {
      id: 'sp-noi-so-thich',
      topic: 'noi-so-thich',
      questions: [
        { en: 'What do you like to do in your spare time?', vi: 'Bạn thích làm gì trong thời gian rảnh rỗi' },
        { en: 'How do you spend your holidays or weekends?', vi: 'Bạn dành cho cuối tuần hoặc kỳ nghỉ của mình như thế nào?' },
        { en: 'What is your favorite way of relaxation?', vi: 'Cách thư giãn yêu thích của bạn là gì?' }
      ],
      outline: [
        { label: 'What', en: 'In my spare time, I like to…', vi: 'Trong thời gian rảnh rỗi thì tôi thích…' },
        { label: 'Why', en: 'Simply because I can…', vi: 'Đơn giản bởi vì tôi có thể…' }
      ],
      ideas: [
        { en: 'Catch up on gossip with my best friends', vi: 'tán gẫu với bạn thân' },
        { en: 'Go window-shopping with my bestie', vi: 'dạo phố với bạn thân' },
        { en: 'Play video games', vi: 'chơi trò chơi điện tử' },
        { en: 'Go travelling around the country/ world', vi: 'đi du lịch khắp đất nước/thế giới' },
        { en: 'Sing karaoke with my classmates / colleagues', vi: 'hát karaoke với bạn học hoặc đồng nghiệp' },
        { en: 'Play cards / board games with my buddies', vi: 'chơi bài/cờ cùng bạn bè' },
        { en: 'Go on a picnic with my family members', vi: 'đi dã ngoại cùng các thành viên trong gia đình' },
        { en: 'Walk my dog or play Frisbee with it', vi: 'dắt chó đi dạo hoặc chơi ném đĩa với nó' },
        { en: 'Release my pressure/ease my stress', vi: 'bớt căng thẳng' },
        { en: 'Keep fit/keep in good shape/build my body/lose weight/live a well-balanced life', vi: 'giữ dáng/có vóc dáng đẹp/có cơ thể săn chắc/giảm cân/sống cân bằng' }
      ]
    },
    {
      id: 'sp-noi-am-nhac',
      topic: 'noi-am-nhac',
      questions: [
        { en: 'Do you like music?', vi: 'Bạn có thích âm nhạc không?' }
      ],
      outline: [
        { label: 'A – Khẳng định', en: 'Definitely yes, everyone enjoys music, and I am no exception. I love…', vi: 'Tất nhiên là có rồi, ai cũng thích âm nhạc và tôi không phải là ngoại lệ' },
        { label: 'Phủ định', en: 'Well, honestly speaking, music is really not my cup of tea simply because…', vi: 'Thành thật mà nói, âm nhạc không phải là sở thích của tôi' },
        { label: 'What', en: 'pop, techno, hip-hop, rock, classical, light music', vi: 'nhạc pop, techno, hip-hop, rock, cổ điển, nhạc nhẹ' },
        { label: 'Where', en: 'Normally, I like to listen to music from my earphones when I take a ride on public transport.', vi: 'Thông thường tôi thích nghe nhạc bằng tai nghe khi đang ở trên phương tiện di chuyển' },
        { label: 'When', en: "When I can't go to sleep, I like to listen some light music to calm myself down.", vi: 'Khi tôi không thể ngủ, tôi thích nghe một ít nhạc nhẹ nhàng để tĩnh tâm lại' },
        { label: 'Who', en: 'My most favorite singers are Adele, James Blunt, and Avril Lavigne.', vi: 'Ca sĩ yêu thích nhất của tôi đó là Adele, James Blunt và Avril Lavigne' },
        { label: 'Why', en: 'I am fond of music mainly because it can cheer me up greatly when I feel down/low/blue/bored/tired/depressed', vi: 'Âm nhạc khiến tôi phấn khởi khi tôi thấy buồn/chán/mệt mỏi/thất vọng…' }
      ],
      ideas: [
        { en: 'Wake me up when I feel drowsy in the morning (rock/punk)', vi: 'Đánh thức tôi dậy khi còn ngái ngủ vào buổi sáng' },
        { en: 'Blow my mind with strong beats and rhythms (hip hop/R&B/rap)', vi: 'Làm đầu óc sảng khoái bởi những giai điệu mạnh mẽ' },
        { en: 'Music is an indispensable part of culture and tradition.', vi: 'Một phần không thể thiếu của văn hóa và truyền thống' },
        { en: 'I may have a better understanding of different cultures around the world.', vi: 'Tôi có thể hiểu biết tốt hơn về các nền văn hóa khác nhau trên thế giới' }
      ]
    },
    {
      id: 'sp-noi-phim',
      topic: 'noi-phim',
      questions: [
        { en: 'Do you like watching films?', vi: 'Bạn có thích xem phim không?' }
      ],
      outline: [
        { label: 'A – Khẳng định', en: 'Speaking of films, yes, I am a big fan of types of films, such as…', vi: 'Vâng, tôi là một fan bự của các thể loại phim như là…' },
        { label: 'What', en: 'comedy, action, romance, sci-fi, vampire, zombie, animation', vi: 'hài hước, hành động, tình cảm,…' },
        { label: 'Where', en: 'Normally, I enjoy watching films at cinemas, for it has a better atmosphere with better sound/visual effects.', vi: 'Thông thường tôi tận hưởng việc xem phim tại rạp bởi vì nó có một bầu không khí tốt hơn với hiệu ứng âm thanh hình ảnh tốt hơn' },
        { label: 'When and Who … with', en: 'When I am available during weekends, I like to see a film with my bestie/girlfriend/boy friend', vi: 'Khi tôi rảnh lúc cuối tuần, tôi thích xem một bộ phim với bạn thân/bạn trai/bạn gái' },
        { label: 'Why', en: 'I love watching films simply because I can/ it can…', vi: 'Tôi thích xem phim đơn giản bởi vì' }
      ],
      ideas: [
        { en: 'Cheer myself up/relax myself/release my pressure (comedy)', vi: 'Vui vẻ/giải trí/thư giãn/giải tỏa áp lực' },
        { en: 'Escape from my daily life and experience something that can hardly happen in real life', vi: 'Thoát khỏi sinh hoạt thường nhật và trải nghiệm những thứ ngoài đời thật không có' },
        { en: 'Boost my imagination and please my eyes with visual effects', vi: 'Tăng cường trí tưởng tượng và đã mắt vì những hiệu ứng hình ảnh' },
        { en: 'Maintain my childhood interest', vi: 'Duy trì niềm vui ngày thơ bé' },
        { en: 'Provoke thought towards humanity and life', vi: 'Giúp hiểu hơn về nhân sinh quan' },
        { en: 'Broaden my horizon and enrich my knowledge', vi: 'Mở rộng tầm nhìn và làm giàu kiến thức' }
      ]
    },
    {
      id: 'sp-noi-du-lich',
      topic: 'noi-du-lich',
      questions: [
        { en: 'Do you like travelling?', vi: 'Bạn có thích du lịch không?' }
      ],
      outline: [
        { label: 'A – Khẳng định', en: 'Undoubtedly yes, travelling is my most favorite', vi: 'Không nghi ngờ gì nữa, du lịch là thứ yêu thích nhất của tôi' },
        { label: 'When – Who … with', en: 'When I am free from study, I like to travel to different places with my friends or family members', vi: 'Khi tôi rảnh rang khỏi việc học, tôi thích đi du lịch đến những địa điểm khác nhau với bạn bè hoặc là thành viên trong gia đình mình' },
        { label: 'Where', en: 'We make trips to big cities like Nha Trang, ancient towns like Hoi An in Quang Nam Province', vi: 'Chúng tôi thực hiện chuyến đi đến các thành phố lớn như Nha Trang, phố cổ Hội An ở tỉnh Quảng Nam' },
        { label: 'Why', en: 'Through travelling, I can…', vi: 'Bằng cách du lịch, tôi có thể' }
      ],
      ideas: [
        { en: 'Meet different people/try different food/experience another culture', vi: 'Gặp gỡ nhiều người khác nhau/thử món ăn khác nhau/trải nghiệm nền văn hóa khác nhau' },
        { en: 'Have a sense of freshness and newness', vi: 'Có cảm giác mới lạ' },
        { en: 'Escape from daily life routines', vi: 'Thoát khỏi sinh hoạt thường nhật' },
        { en: 'Get myself well prepared for the future overseas life', vi: 'Chuẩn bị tốt cho cuộc sống nước ngoài trong tương lai' },
        { en: 'Achieve my lifelong dream of taking a round-the-world tour', vi: 'Tích lũy dần giấc mơ lâu dài của tôi đó là đi du lịch vòng quanh thế giới' }
      ]
    },
    {
      id: 'sp-noi-the-thao',
      topic: 'noi-the-thao',
      questions: [
        { en: 'Do you like doing sport?', vi: 'Bạn có thích chơi thể thao không' }
      ],
      outline: [
        { label: 'A – Khẳng định', en: 'Absolutely yes, I am greatly fascinated by all sorts of sport, including…', vi: 'Tất nhiên là có rồi, tôi thực sự đam mê mọi môn thể thao, bao gồm…' },
        { label: 'What', en: 'badminton, billiards, jogging, hiking, cycling, skiing, skating, swimming', vi: 'cầu lông, bi-a, chạy bộ, đi bộ đường dài, đạp xe, trượt tuyết, trượt băng, bơi lội' },
        { label: 'Who – Where', en: 'Occasionally, I play basketball with my classmates/roommates on the basketball court/ in the stadium', vi: 'Thỉnh thoảng tôi chơi bóng rổ với bạn trong lớp/phòng ở sân bóng rổ hoặc ở sân vận động' },
        { label: 'Why', en: 'I find sport beneficial in a variety of ways. For example, playing sport, I can:', vi: 'Tôi thấy thể thao có ích theo nhiều cách. Ví dụ, khi chơi thể thao, tôi có thể:' }
      ],
      ideas: [
        { en: 'Relax myself/release my pressure/release study burdens/ease tiredness', vi: 'Thư giãn/giải tỏa áp lực/giảm gánh nặng học tập/bớt mệt mỏi' },
        { en: 'Keep fit/keep in good shape/lose weight/build my body', vi: 'Giữ sức khỏe/giữ dáng/giảm cân/rèn luyện cơ thể' },
        { en: 'Strengthen teamwork spirit and improve co-operation skills', vi: 'Tăng cường tinh thần đồng đội và cải thiện các kỹ năng hợp tác' },
        { en: 'Socialise / interact with my peers', vi: 'Giao tiếp với bạn đồng trang lứa' },
        { en: 'Learn the concept of winning and losing/maintain a sense of competition', vi: 'Trải nghiệm được cảm giác chiến thắng và thất bại/duy trì ý thức thi đua' }
      ]
    },
    {
      id: 'sp-noi-doc-sach',
      topic: 'noi-doc-sach',
      questions: [
        { en: 'Do you like reading?', vi: 'Bạn có thích đọc sách báo không' }
      ],
      outline: [
        { label: 'A – Khẳng định', en: 'Yes, I love reading', vi: 'Có, tôi yêu thích đọc sách' },
        { label: 'What', en: 'I normally read novels, newspapers, magazines, and textbooks.', vi: 'Tôi thường đọc tiểu thuyết, sách báo…' },
        { label: 'Where – When', en: 'While I am on a coach, reading is what I usually do to kill time', vi: 'Khi tôi ngồi trên xe khách, đọc sách là thứ mà tôi hay làm để giết thời gian' },
        { label: 'Why', en: 'Reading, essentially, is a part of my daily life since reading can…', vi: 'Đọc sách là một phần trong cuộc sống hằng ngày của tôi bởi vì đọc sách có thể…' }
      ],
      ideas: [
        { en: 'Broaden my horizon', vi: 'Mở rộng tầm nhìn' },
        { en: 'Enrich my knowledge', vi: 'Làm giàu kiến thức' },
        { en: 'Help me keep up with the latest news and information', vi: 'Giúp cập nhật tin tức' },
        { en: 'Cultivate my way of thinking (dependent/critical/creative/analytical)', vi: 'Rèn luyện tư duy' },
        { en: 'Enlighten my mind/set a fire in my mind', vi: 'Khai sáng, mở mang đầu óc' },
        { en: 'Add a bit of fun to my life', vi: 'Thêm chút niềm vui cho cuộc sống' }
      ]
    },
    {
      id: 'sp-noi-mua-sam',
      topic: 'noi-mua-sam',
      questions: [
        { en: 'Do you like shopping?', vi: 'Bạn có thích mua sắm không?' }
      ],
      outline: [
        { label: 'A – Khẳng định', en: 'Oh, when it comes to shopping, I have to say that I am really a shopaholic.', vi: 'Ồ, khi nói đến mua sắm thì tôi phải nói tôi là một người nghiện mua sắm' },
        { label: 'When – Where', en: 'In my spare time, I like to go to shopping at a mall, a convenience store, a grocery store, a supermarket, a department store, or go shopping online.', vi: 'Trong thời gian rảnh rỗi thì tôi thích mua sắm ở trung tâm mua sắm hoặc là mua sắm trên mạng' },
        { label: 'What', en: 'Mostly, I shop for daily necessities, like cosmetics, skin care products, fashion stuff, snacks, clothes, sneakers, etc.', vi: 'Phần lớn, tôi mua sắm cho những thứ cần thiết hằng ngày như mĩ phẩm, sản phẩm chăm sóc da, đồ thời trang, snack, quần áo' },
        { label: 'Why', en: 'I love shopping for a variety of reasons; for example, I can…', vi: 'Tôi thích mua sắm vì nhiều lý do; ví dụ, tôi có thể…' }
      ],
      ideas: [
        { en: 'Relax myself/release my pressure', vi: 'Thư giãn/giải tỏa áp lực' },
        { en: 'Meet my requirements on a daily basis', vi: 'Đáp ứng các nhu cầu hàng ngày của bản thân' },
        { en: 'Get a sense of satisfaction', vi: 'Có cảm giác thoải mái' },
        { en: 'Buy myself a brand-new dress/try on different clothes', vi: 'Mua cho mình một chiếc đầm mới tinh/mặc thử quần áo khác nhau' },
        { en: 'Have an opportunity to catch up with my besties', vi: 'Có dịp theo kịp bạn bè' },
        { en: 'Catch up with the latest trend and fashion', vi: 'Theo kịp xu hướng thời trang mới nhất' },
        { en: 'Facilitate my daily life with new technologies', vi: 'Giảm bớt những khó khăn trong sinh hoạt thường nhật bằng các công nghệ mới' }
      ]
    },
    {
      id: 'sp-noi-hoc-tap-cong-viec',
      topic: 'noi-hoc-tap-cong-viec',
      questions: [
        { en: 'Are you a student or a worker?', vi: 'Bạn là học sinh hay người đi làm?' },
        { en: 'Why did you choose your major/ job?', vi: 'Tại sao bạn chọn ngành/công việc này' },
        { en: 'Is your major/job popular in your country these days?', vi: 'Ngành/nghề mà bạn chọn đang phổ biến ở quốc gia bạn à?' },
        { en: 'How do you like your major/job?', vi: 'Bạn thích ngành/nghề của bạn như thế nào?' },
        { en: 'Is there anything you dislike about your major/ job?', vi: 'Có điều gì mà bạn không thích về ngành/nghề của mình không' }
      ],
      outline: [
        { label: 'Hiện tại', en: 'Currently, I am a senior student at XXX University, majoring in computer science and technology and specializing in programing.', vi: 'Hiện tại em là sinh viên năm cuối của trường đại học XXX, ngành khoa học và công nghệ máy tính, chuyên về lập trình' },
        { label: 'Tốt nghiệp', en: "Well, I am fresh graduate from XXX University, and currently, I'm studying for IELTS at a language center and preparing to further my studies at XXX this coming July.", vi: 'Tôi là sinh viên vừa mới tốt nghiệp ở trường đại học XXX và hiện tại tôi đang học IELTS ở một trung tâm ngoại ngữ và chuẩn bị cho việc học sắp tới ở XXX trong tháng 7' },
        { label: 'Lý do', en: 'I choose it simply because…', vi: 'Tôi chọn nó đơn giản bởi vì' },
        { label: 'Lý do', en: 'The reason why I decided on XXX is that…', vi: 'Lý do vì sao tôi chọn XXX là vì' },
        { label: 'Điều tốt nhất', en: 'Generally, the best thing about my job is… simply/ mainly/ because…', vi: 'Nhìn chung, điều tốt nhất về công việc của tôi là…' }
      ],
      ideas: [
        { en: 'Boost my people skills', vi: 'Nâng cao kỹ năng giao tiếp' },
        { en: 'Expand my social network', vi: 'Mở rộng quan hệ xã hội' },
        { en: 'Meet my requirements', vi: 'Đáp ứng các nhu cầu' },
        { en: 'Financial security', vi: 'Đảm bảo về tài chính' },
        { en: 'Promotion opportunity', vi: 'Cơ hội thăng tiến' },
        { en: 'Self-improvement', vi: 'Hoàn thiện bản thân' }
      ]
    },
    {
      id: 'sp-noi-que-huong',
      topic: 'noi-que-huong',
      questions: [
        { en: 'Where are you from?', vi: 'Bạn đến từ đâu' },
        { en: 'Is it a big city or small town?', vi: 'Đó là thành phố lớn hay là thị trấn nhỏ' },
        { en: 'What is the best thing of living in your home town?', vi: 'Điều gì tuyệt vời nhất khi sống ở quê hương của bạn' },
        { en: 'Is it suitable for young people to live in?', vi: 'Nó có phù hợp cho giới trẻ sinh sống không?' }
      ],
      outline: [
        { label: 'Vị trí địa lý', en: 'My hometown is located in the northern / central / southern part of Vietnam.', vi: 'Quê tôi ở miền Bắc/ Trung / Nam Việt Nam' },
        { label: 'Điểm nổi bật', en: 'My hometown features seafood and stunning ocean views', vi: 'Điểm nổi bật của quê tôi là hải sản và cảnh biển tuyệt đẹp' },
        { label: 'Quy mô', en: 'My hometown is a metropolis with millions of dwellers', vi: 'Thành phố lớn với hàng triệu cư dân' },
        { label: 'Nét đặc sắc', en: 'The most unique characteristic of my hometown is…', vi: 'Đặc điểm riêng biệt của quê hương em đó là…' },
        { label: 'Cảm nhận', en: 'Definitely yes, my hometown is a perfect place for young people to live in simply because…', vi: 'Chắc chắn là có rồi, quê hương của tôi là một nơi tuyệt vời cho các bạn trẻ sinh sống đơn giản bởi vì' }
      ],
      ideas: [
        { en: 'The facilities are well developed, including gyms, schools, hospitals, public transport, and even leisure facilities.', vi: 'Những tiện ích được phát triển tốt, bao gồm phòng gym, trường học, bệnh viện, phương tiện công cộng' },
        { en: 'The facilities are less developed, and the resources are a bit limited.', vi: 'Các tiện ích thì ít được đầu tư, và tài nguyên thì khá giới hạn' },
        { en: 'Young people have all sorts of choices in my city; they can go shopping, enjoy fantastic delicacies, watch films, and so on', vi: 'Giới trẻ có tất cả các sự lựa chọn ở thành phố của em; họ có thể đi mua sắm, xem phim,…' },
        { en: 'Life in my hometown is a bit monotonous; young people have few entertainment options', vi: 'Cuộc sống ở quê em khá nhàm chán, giới trẻ có rất ít sự lựa chọn để giải trí' },
        { en: 'Opportunities in my city are various, from education to job-hunting, from making friends to watching a show, you name it.', vi: 'Có rất nhiều cơ hội ở thành phố của em, từ giáo dục đến tìm việc, từ kết bạn đến xem một chương trình' },
        { en: 'Young people can hardly find a well-paid job in my hometown.', vi: 'Giới trẻ khó để tìm được một công việc được trả lương tốt' }
      ]
    }
  ];

  /* ===== Bảng hiệu đính ===== */
  var corrections = [
    { topic: 'so-thich-the-thao', en: 'basketball', from: 'bỏng rổ', to: 'bóng rổ', kind: 'chính tả' },
    { topic: 'so-thich-the-thao', en: 'jogging', from: 'đi bộ', to: 'chạy bộ', kind: 'nghĩa' },
    { topic: 'so-thich-the-thao', en: 'hiking', from: 'leo núi', to: 'đi bộ đường dài', kind: 'nghĩa' },
    { topic: 'so-thich-the-thao', en: 'going to karaoke bar', from: 'đi hát hò', to: 'đi hát karaoke', kind: 'nghĩa' },
    { topic: 'so-thich-the-thao', en: 'computer games', from: '(không có)', to: 'trò chơi điện tử', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'immediate family', from: 'gia đình hòa thuận, đoàn kết', to: 'gia đình ruột thịt (bố mẹ, anh chị em, con)', kind: 'nghĩa' },
    { topic: 'gia-dinh', en: 'in-laws', from: 'dâu/rể', to: 'họ hàng bên vợ hoặc chồng', kind: 'nghĩa' },
    { topic: 'gia-dinh', en: 'make ends meet', from: 'xoay sở kiếm sống', to: 'xoay xở đủ sống', kind: 'chính tả' },
    { topic: 'du-lich', en: 'market', from: 'siêu thị', to: 'chợ', kind: 'nghĩa' },
    { topic: 'du-lich', en: 'souvenir shops', from: 'shops đồ lưu niệm', to: 'cửa hàng đồ lưu niệm', kind: 'nghĩa' },
    { topic: 'du-lich', en: 'bar', from: 'quán ba', to: 'quán bar', kind: 'chính tả' },
    { topic: 'du-lich', en: 'have a picnic', from: 'đi dạo', to: 'đi dã ngoại', kind: 'nghĩa' },
    { topic: 'du-lich', en: 'go for a walk', from: 'đi bộ', to: 'đi dạo', kind: 'nghĩa' },
    { topic: 'du-lich', en: 'go hiking', from: 'đi leo núi', to: 'đi bộ đường dài', kind: 'nghĩa' },
    { topic: 'du-lich', en: 'spend a lot of money', from: 'tiêu tiền', to: 'tiêu nhiều tiền', kind: 'nghĩa' },
    { topic: 'du-lich', en: 'look round the shops', from: 'lòng vòng các shops', to: 'dạo xem các cửa hàng', kind: 'nghĩa' },
    { topic: 'du-lich', en: 'go shopping', from: '(không rõ)', to: 'đi mua sắm', kind: 'bổ sung' },
    { topic: 'an-uong', en: 'cuttlefish', from: 'sứa', to: 'mực nang', kind: 'nghĩa' },
    { topic: 'an-uong', en: 'mussels', from: 'con trai', to: 'con vẹm (trai biển)', kind: 'nghĩa' },
    { topic: 'an-uong', en: 'green beans', from: 'đậu xanh', to: 'đậu que', kind: 'nghĩa' },
    { topic: 'an-uong', en: 'spinach', from: 'cải thìa', to: 'rau chân vịt (rau bina)', kind: 'nghĩa' },
    { topic: 'an-uong', en: 'melon', from: 'dưa gang', to: 'dưa lưới', kind: 'nghĩa' },
    { topic: 'an-uong', en: 'cherry', from: '(không có)', to: 'quả anh đào', kind: 'bổ sung' },
    { topic: 'an-uong', en: 'coffee', from: '(không có)', to: 'cà phê', kind: 'bổ sung' },
    { topic: 'an-uong', en: 'beer', from: '(không có)', to: 'bia', kind: 'bổ sung' },
    { topic: 'an-uong', en: 'wine', from: 'rượu', to: 'rượu vang', kind: 'nghĩa' },
    { topic: 'an-uong', en: 'awesome', from: '(gốc viết awsome)', to: 'rất ngon, tuyệt', kind: 'chính tả' },
    { topic: 'giai-tri', en: 'thriller', from: 'hài kịch', to: 'phim giật gân', kind: 'nghĩa' },
    { topic: 'giai-tri', en: 'powerful', from: 'sức vang lớn', to: 'mạnh mẽ, ấn tượng sâu sắc', kind: 'nghĩa' },
    { topic: 'giai-tri', en: 'wildlife program', from: 'chương trình động vật hoang giã', to: 'chương trình về thế giới hoang dã', kind: 'chính tả' },
    { topic: 'giai-tri', en: 'game show', from: 'giải trí', to: 'trò chơi truyền hình', kind: 'nghĩa' },
    { topic: 'giai-tri', en: 'music program', from: '(không có)', to: 'chương trình âm nhạc', kind: 'bổ sung' },
    { topic: 'giai-tri', en: 'sports program', from: '(không có)', to: 'chương trình thể thao', kind: 'bổ sung' },
    { topic: 'giai-tri', en: 'jazz', from: '(không có)', to: 'nhạc jazz', kind: 'bổ sung' },
    { topic: 'thoi-trang-mua-sam', en: 'handmade clothes', from: 'quần áo tự tự may', to: 'quần áo may thủ công', kind: 'chính tả' },
    { topic: 'thoi-trang-mua-sam', en: 'skirt', from: 'váy ngắn', to: 'chân váy', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'high-heel shoes', from: 'dày cao gót', to: 'giày cao gót', kind: 'chính tả' },
    { topic: 'thoi-trang-mua-sam', en: 'tights', from: '(gốc viết tight) quần tất', to: 'quần tất', kind: 'chính tả' },
    { topic: 'thoi-trang-mua-sam', en: 'woollen cap', from: '(gốc viết wollen) mũ len', to: 'mũ len', kind: 'chính tả' },
    { topic: 'thoi-trang-mua-sam', en: 'sandals', from: 'dép', to: 'dép quai hậu, xăng-đan', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'earrings', from: 'vòng tai', to: 'bông tai', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'navy blue', from: 'màu xanh nhạt', to: 'màu xanh hải quân (xanh đậm)', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'green', from: 'xanh da trời', to: 'màu xanh lá cây', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'light', from: 'màu sáng', to: 'màu nhạt', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'helpful', from: 'hữu dụng', to: 'nhiệt tình, hay giúp đỡ', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'window shopping', from: 'đi ngắm', to: 'đi ngắm hàng (không mua)', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'department store', from: 'khu mua sắm', to: 'cửa hàng bách hóa', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: "greengrocer's", from: 'cửa hàng tạp hóa', to: 'cửa hàng rau quả', kind: 'nghĩa' },
    { topic: 'thoi-trang-mua-sam', en: 'shoe shop', from: '(gốc viết shoes shops) cửa hàng dày', to: 'cửa hàng giày', kind: 'chính tả' },
    { topic: 'gia-dinh', en: 'grandfather', from: '(không có)', to: 'ông', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'grandmother', from: '(không có)', to: 'bà', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'uncle', from: '(không có)', to: 'chú, bác, cậu', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'aunt', from: '(không có)', to: 'cô, dì, bác gái', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'cousin', from: '(không có)', to: 'anh chị em họ', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'nephew', from: '(không có)', to: 'cháu trai (con của anh chị em)', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'niece', from: '(không có)', to: 'cháu gái (con của anh chị em)', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'father-in-law', from: '(không có)', to: 'bố chồng, bố vợ', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'mother-in-law', from: '(không có)', to: 'mẹ chồng, mẹ vợ', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'brother-in-law', from: '(không có)', to: 'anh rể, em rể, anh em bên vợ hoặc chồng', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'sister-in-law', from: '(không có)', to: 'chị dâu, em dâu, chị em bên vợ hoặc chồng', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'widower', from: '(không có)', to: 'người đàn ông góa vợ', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'widow', from: '(không có)', to: 'người phụ nữ góa chồng', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'step-father', from: '(không có)', to: 'bố dượng', kind: 'bổ sung' },
    { topic: 'gia-dinh', en: 'step-mother', from: '(không có)', to: 'mẹ kế', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'check-in desk', from: '(không có)', to: 'quầy làm thủ tục', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'luggage', from: '(không có)', to: 'hành lý', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'excess baggage', from: '(không có)', to: 'hành lý quá cước', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'boarding card', from: '(không có)', to: 'thẻ lên máy bay', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'passport control', from: '(không có)', to: 'khu kiểm tra hộ chiếu', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'departure lounge', from: '(không có)', to: 'phòng chờ lên máy bay', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'duty-free', from: '(không có)', to: 'cửa hàng miễn thuế', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'gate', from: '(không có)', to: 'cửa ra máy bay', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'hand luggage', from: '(không có)', to: 'hành lý xách tay', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'overhead locker', from: '(không có)', to: 'ngăn hành lý phía trên ghế', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'runway', from: '(không có)', to: 'đường băng', kind: 'bổ sung' },
    { topic: 'du-lich', en: 'take off', from: '(không có)', to: 'cất cánh', kind: 'bổ sung' },
    { topic: 'giai-tri', en: 'classical music', from: 'cổ điển', to: 'nhạc cổ điển', kind: 'nghĩa' }
  ];

  var DATA = {
    topics: topics,
    vocab: vocab,
    structures: structures,
    speaking: speaking,
    corrections: corrections
  };

  if (typeof window !== 'undefined') {
    window.VSEP_DATA = DATA;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DATA;
  }
})();
