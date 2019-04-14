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
接着，我们对每一类的数据进行了初步统计分析，列出了基本统计信息并写入excel表格。

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

def list_file_columns_values(file_name, file_url=working_file_url):
    """
    list a file's columns statistic info.
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
| Total Num   | 980360     | Total Num   | 980360      | Total Num   | 980360    |
| Nan Percent | 0          | Nan Percent | 0           | Nan Percent | 0         |
| 发明专利        | 107        | 1985-11-28  | 1           | 1987-06-03  | 1         |
| 发明公布        | 404207     | 1986-10-03  | 1           | 1988-04-13  | 2         |
| 发明公布更正      | 652        | 1986-10-03­ | 1           | 1989-02-08  | 1         |
| 发明授权        | 170671     | 1987-07-28  | 1           | 1991-02-20  | 1         |
| ...         | ...        | ...         | ...         | ...         | ...       |


通过列出来的统计信息，我们能进一步分析每个表格有多少个数值，空值比是多少，每个数值的多少等等信息。

## 数据清洗

根据上一步的初步分析，我们接下来需要做的就是数据清洗。首先是重复数据的删除。

```python
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
```

删除重复数据后需要做空值的处理，空值的处理需要依据数据意义以及统计信息来决定是删除、插补还是新建类别。在我们的数据处理中，有很多60-90%空缺的列，我们会采取删除列的操作；另外，有些行重要信息空值过多，我们会采取删除行的操作；其余空缺我们大部分用新建类别来标记是空缺值；我们没有用到插补策略。

```python
def drop_rows_too_many_empty(file_name, columns, thresh=2, file_url=clean_data_temp_file_url,
                             dst_file_url=clean_data_temp_file_url):
    """
    drop rows that too many values are empty.
    :param file_name:
    :param columns: the columns we need to check if it is empty
    :param thresh: how many empty is 'too many'
    :param file_url: input file url
    :param dst_file_url: where to store the result
    :return:
    """
    data_frame = file_utils.read_file_to_df(file_url, file_name)
    data_frame = data_frame.dropna(subset=columns, thresh=thresh)

    file_utils.write_file(data_frame, file_utils.check_file_url(dst_file_url), file_name,
                          sheet_name='Sheet', index=False)
    return


def drop_columns(file_name, columns, file_url=clean_data_temp_file_url, dst_file_url=clean_data_temp_file_url):
    try:
        data_frame = file_utils.read_file_to_df(file_url, file_name)
        data_frame = data_frame.drop(columns, axis=1)

        file_utils.write_file(data_frame, file_utils.check_file_url(dst_file_url), file_name,
                              sheet_name='Sheet', index=False)
    except ValueError as e:
        print('except:', e)
    return

def fillna_with_values():
    df = file_utils.read_file_to_df(clean_data_temp_file_url, u'作品著作权')
    values = {u'作品著作权类别'.encode('utf-8'): 9, u'作品著作权登记日期'.encode('utf-8'): '1000-01-01',
              u'作品著作权创作完成日期'.encode('utf-8'): '1000-01-01', u'作品著作权首次发布日期'.encode('utf-8'): '1000-01-01'}
    df = df.fillna(values)
    file_utils.write_file(df, clean_data_temp_file_url, u'作品著作权')
```

在处理完空值之后，观测到数据中很多格式不统一的地方，诸如日期数据，同一列可能出现‘2019-01-01’、‘19-01-01’、‘2019-01’、‘2019’、‘2019年1月1日’等等不同的表达，一些金额数据也有不同单位，可能是‘1000元’、‘1000人民币’、‘1000元人民币’、‘1000’、‘1000美元’等等，对于这些数据，我们需要将每一列的格式统一，带单位的数据需要将单位去除，并进行必要换算（如美元换算成人民币采用汇率6.7）。

同时，在格式统一的过程中我们注意到一些类别数据分类过多、过散、有重复，如‘作品著作权’表`作品著作权类别`就有`'A 文字'`, `'文字'`, `'文字作品'`这几种相同但表述不同的类别存在。于是，我们采取步骤将这些类别进行再分类，降低类别数。

一份完整的数据清洗示例如下。

```python
def empty_value_handle_basic_info():
    """
    empty_value handle for table 年报-企业基本信息.
        Dirty value handle for table 年报-企业基本信息.
    First we'll drop rows that empty value is too many.
    ['企业经营状态','从业人数','是否有网站或网点','企业是否有投资信息或购买其他公司股权',
        '有限责任公司本年度是否发生股东股权转','是否提供对外担保']
    Once there are more than 3 empties in these 6 columns we will drop that row.
    Then we check nulls column by column and decide how to process with it.
    Next we should numeric all the value for future process.
    After these are done, it's time to work out features we can use in this table which belongs
        to exploratory data analysis.

    -----------------------------
    注册资本
    ------
    Based on the primary analysis data, we can drop column 注册资本 which empty percentage is 88%
    -----------------------------
    企业经营状态
    ------
    Empty percentage is 0%(1 out of 14862).
    8 status this value has, they are ['停业','其他','存续','开业','开业/正常经营','歇业','正常开业','清算'].
    We just add another status for the empty value:'Unknown'.
    And based on the counts for every status, we simplify these status to ['正常经营','非正常经营','Unknown']
    ['开业','开业/正常经营','正常开业'] belongs to '正常经营' and ['停业','其他','存续','歇业','清算'] belongs to '非正常经营'.
    So we can map these total 9 status to three: {'正常经营':0,'非正常经营':1,'Unknown':-1}.
    -----------------------------
    从业人数
    ------
    Empty percentage is 0%(0 out of 14862), and some value end with '人' while some are pure number.
    But also there are lots of value valued '企业选择不公示'(11623) and a few valued '人' without number.
    For empty value, we replace with -1 indicating there's no value(be careful here, we don't trigger them as -1 people,
        -1 here works as a status). Those end with '人', we simply drop '人'. Those valued '企业选择不公示',
        we replace it as number 0 which also works as a status, there's 8 '0人's in the original value but
        shouldn't matter.
    -----------------------------
    是否有网站或网点
    ------
    Empty percentage is 0%(0 out of 14862).
    There are 4 status here:['否','无','是','有'], and ['否','无'] should belong to 'No', ['是','有'] belong to 'Yes'.
    -----------------------------
    企业是否有投资信息或购买其他公司股权
    ------
    Empty percentage is 0.02%(3 out of 14862).
    There are 4 status here:['否','无','是','有'], and ['否','无'] should belong to 'No', ['是','有'] belong to 'Yes'.
    Empty value will be mapped to 'Unknown'.
    -----------------------------
    有限责任公司本年度是否发生股东股权转
    ------
    Empty percentage is 0.013%(2 out of 14862).
    There are 4 status here:['否','无','是','有'], and ['否','无'] should belong to 'No', ['是','有'] belong to 'Yes'.
    Empty value will be mapped to 'Unknown'.
    -----------------------------
    是否提供对外担保
    ------
    Empty percentage is 0.075%(11 out of 14862).
    There are 2 status here:['否','是'], we map them to ['No', 'Yes'].
    Empty value will be mapped to 'Unknown'.
    -----------------------------
    发布日期
    ------
    Empty percentage is 0%(0 out of 14862).
    And it's well formatted, so without any process on this column.

    -----------------------------
    年报年份
    ------
    Empty percentage is 0%(0 out of 14862).
    And it's well formatted, so without any process on this column.
    -----------------------------
    :return:
    """
    # EMPTY CHECK
    empty_check_list = [u'企业经营状态'.encode('utf-8'),
                        u'从业人数'.encode('utf-8'),
                        u'是否有网站或网点'.encode('utf-8'),
                        u'企业是否有投资信息或购买其他公司股权'.encode('utf-8'),
                        u'有限责任公司本年度是否发生股东股权转'.encode('utf-8'),
                        u'是否提供对外担保'.encode('utf-8')]
    dcu.drop_rows_too_many_empty(u'年报-企业基本信息.xlsx', columns=empty_check_list, thresh=3)

    # LIST OUT VALUES AFTER EMPTY ROWS HANDLED
    panaly.list_category_columns_values([u'年报-企业基本信息'], u'年报-企业基本信息_empty_handled',
                                        file_url=clean_data_temp_file_url)

    # COLUMNS HANDLE
    # 注册资本
    dcu.drop_columns(u'年报-企业基本信息', [u'注册资本'.encode('utf-8')])

    # 企业经营状态
    status_normal = [u'开业', u'开业/正常经营', u'正常开业']
    status_unnormal = [u'停业', u'其他', u'存续', u'歇业', u'清算']
    status_list = [status_normal, status_unnormal]
    status_after = [u'正常经营', u'非正常经营', u'Unknown']
    dcu.merge_status(u'年报-企业基本信息', u'企业经营状态'.encode('utf-8'), status_list, status_after)

    # 从业人数
    dcu.drop_unit(u'年报-企业基本信息', u'从业人数'.encode('utf-8'), [u'人', u' 人'],
                  empty_mask=-1)

    # 是否有网站或网点
    yn_status_n = [u'否', u'无']
    yn_status_y = [u'是', u'有']
    yn_status_list = [yn_status_n, yn_status_y]
    yn_status_after = ['No', 'Yes']

    dcu.merge_status(u'年报-企业基本信息', u'是否有网站或网点'.encode('utf-8'), yn_status_list, yn_status_after)

    # 企业是否有投资信息或购买其他公司股权
    dcu.merge_status(u'年报-企业基本信息', u'企业是否有投资信息或购买其他公司股权'.encode('utf-8'), yn_status_list, yn_status_after)

    # 有限责任公司本年度是否发生股东股权转
    dcu.merge_status(u'年报-企业基本信息', u'有限责任公司本年度是否发生股东股权转'.encode('utf-8'), yn_status_list, yn_status_after)

    # 是否提供对外担保
    dcu.merge_status(u'年报-企业基本信息', u'是否提供对外担保'.encode('utf-8'), yn_status_list, yn_status_after)

    # 发布日期

    # 年报年份

    return
```

## 特征提取

## 初步模型选取

## 参数调整

## 模型调整

