# IEEE ISI-World Cup 参赛历程
<!--IEEE ISI-World Cup 2019 比赛从2019年3月15日开始-->
<!--2019-04-10-->
<!--数据挖掘,大数据,随机森林-->

## 题目介绍
**题目：** 企业投资价值评估

**目标：** 根赛题主办方提供了38张xlsx格式企业各种数据以及企业投资价值综合评分（百分制，包含小数）的表格，包含上市企业的：基本工商信息、购地信息、年报信息、财务信息、纳税信息、知识产权信息等各维度全量企业数据，以此训练模型评测企业投资价值评分，训练集有3000家，最后用模型给测试集500家企业评分，依据RMSE结果排名。

## 解题思路

最终的目标是通过机器学习模型评估测试集企业的投资价值综合评分。注意到我们的目标是连续型的数值，因此回归模型是合理的选择，但整数的评分会给我们带来模型选择上更多的便利，因此我们决定先采用分类模型对数据进行初步评分，再通过回归模型提高精确度。我们最终的思路如下：

1. 理解问题
2. 数据探索
3. 数据清洗
4. 特征提取
5. 特征筛选
6. 尝试并比较几种基本模型
7. 尝试组合模型
8. 优化参数
9. 分析结果

以上步骤可能会反复进行。

## 开始

对题目要求有了初步了解之后，我们开始准备环境。python是目前最为火热的数据分析语言之一，其丰富的数据处理包为我们提供了很多方便。我们采用PyCharm开发，python版本为2.7，引入了`xlrd`，`xlwt`，`xlsxwriter`，`pandas`，`numpy`，`matplotlib`，`seaborn`，`scikit-learn`，`xgboost`等包。

## 数据初整理

企业信息共有38张表格，除去企业评分表外37张数据表格我们将其分成7类：年报类、财务信息类、软资产类、竞品类、纳税类、购地类、基本信息。

``` python
category_annual_report_files = [u'年报-企业基本信息',
                                u'年报-企业资产状况信息',
                                u'年报-对外投资信息',
                                u'年报-的对外提供保证担保信息',
                                u'年报-社保信息',
                                u'年报-网站或网点信息',
                                u'年报-股东股权转让',
                                u'年报-股东（发起人）及出资信息']

category_soft_assets_files = [u'专利',
                              u'产品',
                              u'作品著作权',
                              u'商标',
                              u'资质认证',
                              u'软著著作权',
                              u'项目信息']

category_finance_files = [u'上市公司财务信息-每股指标',
                          u'上市信息财务信息-财务风险指标',
                          u'上市信息财务信息-成长能力指标',
                          u'上市信息财务信息-利润表',
                          u'上市信息财务信息-现金流量表',
                          u'上市信息财务信息盈利能力指标',
                          u'上市信息财务信息运营能力指标',
                          u'上市信息财务信息资产负债表'
                          ]

category_competing_products = [u'竞品']

category_paying_taxes = [u'纳税A级年份',
                         u'一般纳税人']

category_basic_information = [u'工商基本信息表',
                              u'海关进出口信用',
                              u'招投标',
                              u'债券信息',
                              u'融资信息']

category_landing_purchase = [u'购地-地块公示',
                             u'购地-市场交易-土地抵押',
                             u'购地-市场交易-土地转让',
                             u'购地-房地产大企业购地情况',
                             u'购地-房地产大地块出让情况',
                             u'购地-结果公告']
```
接着，我们对每一类的数据进行了去重和初步统计分析，列出了基本统计信息并写入excel表格。

```python
def read_file_to_df(file_dir, file_name, ext='.xlsx', sheet_name='Sheet'):
    """
    read file from the file_dir, currently we read excel. Once the data type changed, we are convenient to change here.
    :param file_dir:
    :param file_name: file name without extension
    :param ext: file's extension, maybe '.xlsx','.xls' or '.csv'
    :param sheet_name: sheet name
    :return:
    """
    fn_split = file_name.split('.')
    file_name = fn_split[0]  # remove the extension
    if len(fn_split) > 1:
        ext = '.' + fn_split[1]

    return pandas.read_excel(file_dir + file_name + ext, sheet_name=sheet_name)

def merge_rows(file_name, keys=None, file_url=working_file_url, dst_file_url=clean_data_temp_file_url):
    """
    remove duplicated rows.
    :param file_name:
    :param keys:
    :param file_url:
    :param dst_file_url: which file folder should store the result
    :return:
    """

    data_frame = file_utils.read_file_to_df(file_url, file_name)
    data_frame = data_frame.drop_duplicates()

    file_utils.write_file(data_frame, file_utils.check_file_url(dst_file_url), file_name,
                          sheet_name='Sheet', index=False)

    return

def list_file_columns_values(file_name, file_url=working_file_url):
    """

    :param file_name:
    :param file_url:
    :return:
    """
    columns_dict = {}
    data = file_utils.read_file_to_df(file_url, file_name)
    for column in data.columns:
        print ('column:%s' % column)
        if list(data.columns).index(column) == 0:  # ignore the first column -- the number of company
            continue
        dropped_data = data.drop_duplicates(subset=[column], keep='first')

        sort_list = dropped_data[column].tolist()
        sort_list.sort()
        sort_list.insert(0, 'Nan Percent')
        sort_list.insert(0, 'Total Num')
        count_list = []
        for item in sort_list:
            if item == 'Total Num':
                count_list.append(data.__len__())
            elif item == 'Nan Percent':
                try:
                    count_list.append(float(float(data[column].isna().sum()) / float(data[column].__len__())))
                except AttributeError as ae:
                    count_list.append(0)
            elif item is numpy.nan:
                try:
                    count_list.append(data[column].isna().sum())
                except AttributeError as ae:
                    count_list.append(0)
            elif isinstance(item, unicode):
                counted_data = data[data[column] == item.encode('utf-8')]
                count_list.append(counted_data.__len__())
            else:
                count_list.append(data[data[column] == item].__len__())
        column_dict = {column: sort_list}
        count_dict = {column + '_count': count_list}
        columns_dict.update(column_dict)
        columns_dict.update(count_dict)

    return columns_dict

```

下表是专利信息表格的统计信息（部分）。

| 专利类型        | 专利类型_count | 授权公告日       | 授权公告日_count | 申请日         | 申请日_count |
|-------------|------------|-------------|-------------|-------------|-----------|
| Total Num   | 531724     | Total Num   | 531724      | Total Num   | 531724    |
| Nan Percent | 0          | Nan Percent | 0           | Nan Percent | 0         |
| 发明专利        | 93         | 1985-11-28  | 1           | 1987-06-03  | 1         |
| 发明公布        | 189432     | 1986-10-03  | 1           | 1988-04-13  | 2         |
| 发明公布更正      | 562        | 1986-10-03­ | 1           | 1989-02-08  | 1         |
| 发明授权        | 130662     | 1987-07-28  | 1           | 1991-02-20  | 1         |
| 发明授权更正      | 28         | 1988-04-22  | 1           | 1992-12-09  | 1         |
| 外观设计        | 45554      | 1989-05-20  | 1           | 1993-08-18  | 1         |
| 外观设计更正      | 20         | 1989-08-10  | 1           | 1993-08-25  | 1         |
| 实用新型        | 165325     | 1989-12-18  | 3           | 1993-10-13  | 1         |
| 实用新型更正      | 48         | 1991-04-05  | 1           | 1993-10-20  | 2         |
|             |            | ...         | ...         | ...         | ...       |

通过列出来的统计信息，我们能进一步分析每个表格有多少个数值，空值比是多少，每个数值的多少等等信息。

## 数据清洗

## 特征提取

## 初步模型选取

## 参数调整

## 模型调整

