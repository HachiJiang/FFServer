# FFServer
目的：Training RESTful Server

[TOC]

### 思路
使用框架：Express.js + MongoDB
选型理由：快速搭建Server
步骤：
- [x] 1.使用Express.js搭建网站后端框架，并处理报错；
- [x] 2.根据记账需求设计API，并在Server端调通；
- [x] 3.设计MongoDB Schema；
- [x] 4.实现API业务逻辑，并联调；
- [ ] 5.Security - 实现Signup/Login/Logout。
- [ ] 6.使用HTTPs

### API设计文档
#### Users [多用户未完成]
用于管理注册用户。url均以/api/v1开始。

| HTTP   | URL            | Request Body              | Description | Return |
| ------ | -------------- | ------------------------- | ----------- | ------ |
| POST   | /users         | { email, name, password } | 注册新用户       |        |
| POST   | /users???      | { email, password }       | 登录          |        |
| POST   | /users???      | { session }               | 登出          |        |
| PUT    | /users/:userId |                           | 更新用户信息      |        |
| DELETE | /users/:userId | {}                        | 删除用户        |        |

#### Records
用于操作日常流水记录，以下URL省略host前缀，http://localhost:8000/api/vi/...

| HTTP   | URL                                | Request Body | Description         | Return |
| ------ | ---------------------------------- | ------------ | ------------------- | ------ |
| GET    | /records                           | {}           | 获取最近的20条记录          |        |
| GET    | /records/from/:fromDate/to/:toDate | {}           | 获取某个时间段的流水记录，精确到Day |        |
| POST   | /records	{ record: { ... } }       |              | 创建一个新的流水记录          |        |
| PUT    | /records/:rid	{ record: { ... } }  |              | 更新某条流水记录            |        |
| DELETE | /records/:rid                      | {}           | 删除某条流水记录            |        |

#### Accounts
用于管理账户，两级类别，如：银行账户（招商银行，。），基金账户（余额宝，。），P2P，等等。

HTTP	URL	Request Body	Description	Return
GET	/accounts	{}	获取所有的账户类别	
POST	/accounts	{ name: String, items: [] }	创建新的类别	
POST	/accounts/:catId/items	{ catId: String, name: String }	给指定类别创建新的账户	
PUT	/accounts/:catId	{ name: String, items: [] }	更新某个类别	
PUT	/accounts/:catId/items/:itemId	{ name: String }	更新某个账户的名字	
DELETE	/accounts/:catId	{}	删除某个类别	
DELETE	/accounts/:catId/items/:itemId	{}	删除某个账户	

#### Projects
用于管理项目，两级类别，如：日常，旅游度假（南京2016，台湾2017，。），等等。

API同Accounts, 以/projects开始。

#### Income
用于收入类别，两级类别，如：工资奖金（基本工资，奖金，etc），理财，等等。

API同Accounts, 以/income开始。

#### Outcome
用于支出类别，两级类别，如：工资奖金（基本工资，奖金，etc），理财，等等。

API同Accounts, 以/outcome开始。

#### FamilyMembers
用于管理家庭成员。

HTTP	URL	Request Body	Description	Return
GET	/members	{}	获取所有的家庭成员	
POST	/members	{ name: String }	创建新的成员	
PUT	/members/:memberId	{ name: String }	更新某个成员名称	
DELETE	/members/:memberId	{}	删除某个成员	

#### Debtors
用于管理债务债券关系人。

API同FamilyMembers, 以/debtors开始

#### Schema [未实现]
用于获取所有schema信息，包括 #3~8。

用于管理家庭成员。

HTTP	URL	Request Body	Description	Return
GET	/schema	{ outcomeCategories, incomCategories, accountCategories, projectCategories, members, debtors }	获取所有的家庭成员	

#### Budgets
用于管理预算信息。

HTTP	URL	Request Body	Description	Return





#### Dashboards

### Security

### 数据库设计
技术选型：MongoDB
选型理由：正在学习MongoDB

数据表
- users --- 暂不支持多用户
- incomes_${userId}
- outcomes_${userId}
- accounts_${userId}
- projects_${userId}
- members_${userId}
- debtors_${userId}
- 数据库备份与恢复
