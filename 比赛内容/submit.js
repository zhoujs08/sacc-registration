/*
 *
 * 1. 注释
 *    // 单行注释；斜杠后直到本行末尾都不会执行。
 *    /* ... *\/ 块注释；可跨越多行。emmmm这就是。
 *
 * 2. const 与变量
 *    const name = value; 声明必须赋初值且不能再次赋值的块级变量。
 *    const 限制的是“变量重新指向别处”，对象或数组内部仍可修改，
 *    例如 registrationList.push(newRegistration)。
 *
 * 3. 基本值与特殊值
 *    本文件使用字符串（'文字'）、数字（1、20、500）、布尔值
 *    （true、false）、空值 null，以及空数组 []。
 *
 * 4. 函数
 *    function 函数名(参数) { ... } 是函数声明，可接收参数并重复调用。
 *    return 值; 立即结束函数并把值交给调用处；单独 return; 只结束函数。
 *    function createTableCell(content, className = '') 中的 = '' 是默认参数：
 *    调用时若未传 className（或传入 undefined），就使用空字符串。
 *
 * 5. 匿名函数、箭头函数与回调函数
 *    function (event) { ... } 是匿名函数。
 *    registration => registration.studentId === studentId 是箭头函数；只有一个
 *    参数时可省略圆括号，只有一个表达式时会隐式返回表达式结果。
 *    把函数传给 addEventListener、forEach、some、filter 等方法时，该函数叫回调函数。
 *
 * 6. 条件判断与逻辑运算
 *    if (条件) { ... }：条件为真时执行代码块。
 *    === / !==：严格相等 / 严格不等，同时比较值和类型。
 *    < / >：小于 / 大于；||：逻辑“或”；!：逻辑“非”（取反）。
 *
 * 7. 异常处理
 *    try { ... } catch (error) { ... }：尝试执行可能报错的代码；发生异常时，
 *    catch 接收错误对象并执行补救逻辑。本文件用它保护 JSON.parse。
 *
 * 8. 数组
 *    [] 创建空数组；Array.isArray(value) 判断值是否为数组。
 *    push(value) 把元素追加到原数组末尾。
 *    forEach((item, index) => { ... }) 逐项执行操作，index 是下标。
 *    some(item => 条件) 检查是否至少有一项满足条件，返回布尔值。
 *    filter(item => 条件) 创建只包含满足条件元素的新数组。
 *    length 表示数组元素个数（也可表示字符串字符数）。
 *
 * 9. 对象与属性
 *    { key: value, ... } 是对象字面量，用键值对组织数据。
 *    object.property 使用点语法读取或设置属性，例如 result.textContent。
 *    连续的 .method().property 是链式访问；换行不会改变其含义。
 *    dataset.id 对应 HTML 元素的 data-id 自定义属性。
 *
 * 10. 字符串与正则表达式
 *    trim() 删除字符串首尾空白；replace(规则, 替换内容) 执行替换。
 *    /.../ 是正则表达式字面量；test(text) 判断字符串是否匹配。
 *    ^ / $：开头 / 结尾；\d：数字；{n}、{n,m}：重复次数；
 *    [3-9]：3 到 9 中任一字符；(...)：捕获组。
 *    '$1****$2' 中 $1、$2 引用正则的第 1、2 个捕获组。
 *
 * 11. DOM（操作网页元素）
 *    document.querySelector('CSS选择器') 查找第一个匹配元素。
 *    document.createElement('标签名') 创建元素。
 *    appendChild(child) 添加子元素；replaceChildren() 清空子元素。
 *    textContent 安全地读写纯文本；className 设置 class；hidden 控制显隐；
 *    style.color 设置行内文字颜色；value 读取表单值；reset() 重置表单。
 *    closest(selector) 从当前元素向上寻找最近的匹配元素。
 *
 * 12. 事件
 *    element.addEventListener('事件名', 回调) 注册事件监听器。
 *    submit 是表单提交事件，click 是点击事件。
 *    event.preventDefault() 阻止事件的默认行为；event.target 是事件起始元素。
 *    在父元素上监听其子元素事件叫“事件委托”，适合动态创建的按钮。
 *
 * 13. 浏览器存储与 JSON
 *    localStorage.getItem(key) 读取字符串；setItem(key, value) 保存字符串。
 *    JSON.stringify(value) 把 JavaScript 值转成 JSON 字符串；
 *    JSON.parse(text) 把 JSON 字符串还原成 JavaScript 值。
 *
 * 14. 浏览器及内置 API
 *    console.error(...) 在控制台输出错误。
 *    window.confirm(message) 显示确认框并返回 true 或 false。
 *    crypto.randomUUID() 生成唯一标识符。
 *    new Date() 通过 new 创建日期对象；toLocaleString('zh-CN') 按中文习惯格式化。
 *
 * 15. 代码块、语句与格式
 *    { ... } 表示代码块；(...) 用于传参、条件及控制运算顺序。
 *    分号表示一条语句结束。JavaScript 支持自动补分号，但统一书写更清晰。
 *    多行函数调用和链式调用只是排版方式，不影响执行结果。
 */

// 获取页面中的报名表单、提示区域和数据表
const baomingBiaodan = document.querySelector('#baoming');
const jieguo = document.querySelector('#jieguo');
const baomingShuju = document.querySelector('#baoming-shuju');
const kongShujuTishi = document.querySelector('#kong-shuju-tishi');

// localStorage 中保存报名信息时使用的名称
const CUNCHU_MINGCHENG = 'saccRegistrationList';

// 从浏览器中读取以前保存的报名数据
function getRegistrationList() {
  const baocunShuju = localStorage.getItem(CUNCHU_MINGCHENG);

  if (baocunShuju === null) {return [];}

  try {
    const baomingLiebiao = JSON.parse(baocunShuju);

    if (Array.isArray(baomingLiebiao)) {return baomingLiebiao;}

    return [];
  } catch (error) {
    console.error('读取报名数据失败：', error);
    return [];
  }
}

// 把报名数据保存到浏览器
function saveRegistrationList(registrationList) {
  localStorage.setItem(
    CUNCHU_MINGCHENG,
    JSON.stringify(registrationList)
  );
}

// 显示操作结果
function showResult(message, color) {
  jieguo.textContent = message;
  jieguo.style.color = color;
}

// 隐藏手机号中间四位
function hidePhoneNumber(phone) {
  return phone.replace(
    /^(\d{3})\d{4}(\d{4})$/,
    '$1****$2'
  );
}

// 创建普通表格单元格
function createTableCell(content, className = '') {
  const danyuange = document.createElement('td');

  // 使用 textContent 可以避免用户输入的 HTML 被执行
  danyuange.textContent = content;

  if (className !== '') {
    danyuange.className = className;
  }

  return danyuange;
}

// 将报名数据渲染到表格
function renderRegistrationTable() {
  const baomingLiebiao = getRegistrationList();

  // 清除表格中原来显示的数据
  baomingShuju.replaceChildren();

  // 没有数据时显示提示
  if (baomingLiebiao.length === 0) {
    kongShujuTishi.hidden = false;
    return;
  }

  kongShujuTishi.hidden = true;

  baomingLiebiao.forEach((registration, index) => {
    const hang = document.createElement('tr');

    hang.appendChild(createTableCell(index + 1));
    hang.appendChild(createTableCell(registration.name));
    hang.appendChild(createTableCell(registration.studentId));
    hang.appendChild(createTableCell(registration.college));
    hang.appendChild(createTableCell(registration.major));
    hang.appendChild(
      createTableCell(hidePhoneNumber(registration.phone))
    );
    hang.appendChild(
      createTableCell(
        registration.introduction,
        'jieshao-danyuange'
      )
    );
    hang.appendChild(createTableCell(registration.createdAt));

    // 创建删除按钮
    const caozuoDanyuange = document.createElement('td');
    const shanchuAnniu = document.createElement('button');

    shanchuAnniu.type = 'button';
    shanchuAnniu.className = 'shanchu-anniu';
    shanchuAnniu.textContent = '删除';
    shanchuAnniu.dataset.id = registration.id;

    caozuoDanyuange.appendChild(shanchuAnniu);
    hang.appendChild(caozuoDanyuange);

    baomingShuju.appendChild(hang);
  });
}

// 检查手机号格式
function isValidPhone(phone) {
  const shoujihaoGeshi = /^1[3-9]\d{9}$/;
  return shoujihaoGeshi.test(phone);
}

// 检查学号格式
function isValidStudentId(studentId) {
  // 允许6至20位数字
  const xuehaoGeshi = /^\d{6,20}$/;
  return xuehaoGeshi.test(studentId);
}

// 提交报名表单
baomingBiaodan.addEventListener('submit', function (event) {
  // 阻止浏览器刷新页面
  event.preventDefault();

  // 获取并整理用户输入的内容
  const xingming = document.querySelector('#xingming').value.trim();
  const xuehao = document
    .querySelector('#xuehao')
    .value
    .trim();
  const xueyuan = document.querySelector('#xueyuan').value.trim();
  const zhuanye = document.querySelector('#zhuanye').value.trim();
  const shoujihao = document.querySelector('#shoujihao').value.trim();
  const ziwojieshao = document
    .querySelector('#ziwojieshao')
    .value
    .trim();

  // 检查姓名
  if (xingming.length < 2 || xingming.length > 20) {
    showResult('姓名长度应为2至20个字符', '#d64545');
    return;
  }

  // 检查学号
  if (!isValidStudentId(xuehao)) {
    showResult('请输入6至20位数字组成的学号', '#d64545');
    return;
  }

  // 检查手机号
  if (!isValidPhone(shoujihao)) {showResult('请输入正确的11位手机号', '#d64545');return;}

  // 检查自我介绍
  if (ziwojieshao.length < 10) {
    showResult('自我介绍不能少于10个字符', '#d64545');return;}

  if (ziwojieshao.length > 500) {showResult('自我介绍不能超过500个字符', '#d64545');return;}

  const baomingLiebiao = getRegistrationList();

  // 检查学号是否已经报名
  const xuehaoYicunzai = baomingLiebiao.some(registration => registration.studentId === xuehao);

  if (xuehaoYicunzai) {showResult('该学号已经提交过报名信息', '#d64545');return;}

  // 检查手机号是否已经报名
  const shoujihaoYicunzai = baomingLiebiao.some(registration => registration.phone === shoujihao);

  if (shoujihaoYicunzai) {showResult('该手机号已经提交过报名信息', '#d64545');return;}

  // 创建一条完整的报名数据
  const xinBaoming = {id: 
    crypto.randomUUID(),
    name: xingming,
    studentId: xuehao,
    college: xueyuan,
    major: zhuanye,
    phone: shoujihao,
    introduction: ziwojieshao,
    createdAt: new Date().toLocaleString('zh-CN')
  };

  // 添加并保存报名信息
  baomingLiebiao.push(xinBaoming);
  saveRegistrationList(baomingLiebiao);

  // 更新页面
  renderRegistrationTable();
  baomingBiaodan.reset();

  showResult('报名信息提交成功！', '#218739');
});


// 页面打开时显示以前保存的数据
renderRegistrationTable();



