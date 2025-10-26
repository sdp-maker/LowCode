/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 数据生成工具函数
 */

// 数字格式化函数 - 转换为k/w单位
export const formatNumber = (num) => {
  const number = parseInt(num)
  if (number >= 10000) {
    return (number / 10000).toFixed(1) + 'w'
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k'
  }
  return number.toString()
}

// 真实头像生成函数 - 使用真实人物头像API
export const getRandomAvatar = (seed, index) => {
  // 使用多个真实头像服务
  const avatarServices = [
    // ThisPersonDoesNotExist - AI生成的真实人脸
    `https://thispersondoesnotexist.com/image?${index}`,
    // Pravatar - 真实头像库
    `https://i.pravatar.cc/64?img=${(index % 70) + 1}`,
    // Picsum Photos - 人物照片
    `https://picsum.photos/seed/${seed}/64/64?random=${index}`,
    // 备用：使用更真实的DiceBear风格
    `https://api.dicebear.com/7.x/notionists/png?seed=${seed}&size=64`,
    `https://api.dicebear.com/7.x/lorelei/png?seed=${seed}&size=64`,
    // JSONPlaceholder 头像
    `https://robohash.org/${seed}?set=set4&size=64x64&bgset=bg1`,
  ]
  
  // 优先使用真实头像服务
  const serviceIndex = index % avatarServices.length
  return avatarServices[serviceIndex]
}

// 随机姓名生成函数
export const getRandomName = () => {
  const surnames = ['张', '李', '王', '赵', '钱', '孙', '周', '吴', '郑', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹']
  const names = ['伟', '芳', '娜', '敏', '静', '立', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '霞', '平', '刚', '桂英', '建华', '文', '华', '金凤', '志强', '秀兰', '秀珍', '建国', '国强', '玉兰', '秀云', '桂兰', '志明', '春梅', '建军', '海燕', '志华', '玉梅', '秀梅', '丽娟', '志刚', '桂珍', '建平', '玉珍', '桂花', '志勇', '丽华', '晓明', '小红', '小丽', '小华', '小军', '小燕', '小峰', '小雨', '小雪', '小月', '小阳', '小春', '小夏', '小秋', '小冬', '晨曦', '雨露', '星辰', '月亮', '阳光', '彩虹', '梦想', '希望', '未来', '成功', '幸福', '快乐', '健康', '平安', '吉祥', '如意', '美好', '温馨', '和谐', '宁静']
  return surnames[Math.floor(Math.random() * surnames.length)] + names[Math.floor(Math.random() * names.length)]
}

// 随机爱好生成函数
export const getRandomHobbies = () => {
  const hobbies = ['basketball', 'football', 'swimming', 'reading', 'music', 'cooking', 'travel', 'photography', 'gaming', 'coding', 'yoga', 'meditation', 'dancing', 'singing', 'gardening', 'pets', 'movies', 'books', 'fitness', 'running', 'painting', 'drawing', 'guitar', 'writing', 'blogging', 'hiking', 'camping', 'chess', 'puzzles', 'fashion', 'shopping', 'volunteering', 'charity', 'languages', 'culture', 'investing', 'finance', 'technology', 'AI', 'environmental', 'green', 'entrepreneurship', 'education', 'teaching', 'healthcare', 'medicine']
  const count = Math.floor(Math.random() * 3) + 1 // 1-3个爱好
  const selectedHobbies = []
  for (let i = 0; i < count; i++) {
    const hobby = hobbies[Math.floor(Math.random() * hobbies.length)]
    if (!selectedHobbies.includes(hobby)) {
      selectedHobbies.push(hobby)
    }
  }
  return selectedHobbies.join(', ')
}

// 随机描述生成函数
export const getRandomDescription = () => {
  const descriptions = ['热爱生活的人', '积极向上', '乐观开朗', '工作认真', '学习能力强', '团队合作', '创新思维', '责任心强', '沟通能力佳', '执行力强', '细心负责', '勤奋努力', '善于思考', '富有创意', '专业技能强', '经验丰富', '适应能力强', '学习新技术', '解决问题能力强', '领导能力', '组织协调', '客户服务', '市场敏感', '数据分析', '项目管理']
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// 生成大量用户数据的函数
export const generateLargeUserData = () => {
  const users = []
  for (let i = 0; i < 100000; i++) { // 生成10万个用户数据，模拟大型应用场景
    const id = String(i).padStart(3, '0')
    const name = getRandomName()
    const age = Math.floor(Math.random() * 40) + 18 // 18-58岁
    const status = Math.random() > 0.3 // 70%概率为true
    const hobbies = getRandomHobbies()
    const avatar = getRandomAvatar(`${name}-${i}`, i) // 使用姓名和索引生成真实头像
    const description = getRandomDescription()
    
    users.push([id, name, age.toString(), status, hobbies, avatar, description])
  }
  return users
}

// 生成大量订单数据的函数
export const generateLargeOrderData = () => {
  const orders = []
  const orderTypes = ['电子产品订单', '服装订单', '家具订单', '食品订单', '图书订单', '化妆品订单', '运动器材订单', '汽车配件订单', '办公用品订单', '宠物用品订单', '母婴用品订单', '数码配件订单', '家电订单', '珠宝订单', '药品订单', '玩具订单', '家居用品订单', '户外用品订单', '音响设备订单', '摄影器材订单']
  const statuses = ['已完成', '处理中', '待处理', '已发货', '已取消', '退款中']
  const descriptions = ['高端产品', '热销商品', '限量版', '定制产品', '进口商品', '品牌直销', '特价商品', '新品上市', '经典款式', '用户推荐']
  
  for (let i = 0; i < 2000; i++) { // 生成2000个订单
    const id = `O${String(i + 1).padStart(4, '0')}`
    const orderType = orderTypes[Math.floor(Math.random() * orderTypes.length)]
    const amount = Math.floor(Math.random() * 50000) + 100 // 100-50000的随机金额
    const status = Math.random() > 0.3 // 70%概率为true
    const statusText = statuses[Math.floor(Math.random() * statuses.length)]
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]
    
    orders.push([id, orderType, amount.toString(), status, statusText, '📦', description])
  }
  return orders
}

// 表格模板数据
export const getSheetTemplate = (templateType) => {
  switch (templateType) {
    case 'products':
      return [
        ['P001', '苹果手机', '6999', true, '电子产品', '📱', '最新款智能手机'],
        ['P002', '笔记本电脑', '8999', true, '电子产品', '💻', '高性能办公电脑'],
        ['P003', '无线耳机', '299', true, '配件', '🎧', '蓝牙无线耳机'],
        ['P004', '智能手表', '1999', false, '可穿戴', '⌚', '健康监测手表'],
        ['P005', '平板电脑', '3999', true, '电子产品', '📱', '轻薄便携平板'],
      ]
    case 'employees':
      return [
        ['E001', '张三', '开发工程师', true, '技术部', '👨‍💻', '全栈开发工程师'],
        ['E002', '李四', '产品经理', true, '产品部', '👩‍💼', '资深产品经理'],
        ['E003', '王五', '设计师', true, '设计部', '🎨', 'UI/UX设计师'],
        ['E004', '赵六', '测试工程师', false, '技术部', '🧪', '自动化测试工程师'],
        ['E005', '钱七', '运营专员', true, '运营部', '📊', '数据运营专员'],
      ]
    case 'projects':
      return [
        ['PR001', '电商平台', '进行中', true, '高优先级', '🛒', '在线购物平台开发'],
        ['PR002', '移动应用', '已完成', true, '中优先级', '📱', 'iOS/Android应用'],
        ['PR003', '数据分析', '计划中', false, '低优先级', '📈', '用户行为分析系统'],
        ['PR004', '客服系统', '进行中', true, '高优先级', '💬', '智能客服聊天系统'],
        ['PR005', '支付系统', '测试中', true, '高优先级', '💳', '安全支付网关'],
      ]
    default:
      return [
        ['001', '示例数据1', '100', true, '类型A', '📄', '这是示例描述'],
        ['002', '示例数据2', '200', false, '类型B', '📄', '这是示例描述'],
        ['003', '示例数据3', '300', true, '类型A', '📄', '这是示例描述'],
      ]
  }
}
