## 2.3.1 Classic citation indicators
以下指标根据以下指标为山西财经大学2016年sci指标计算

**Total citations (TC):**

给定时期内发布作品的总引用。

$535$

**Average citations (Cave):**

作品的平均引用。

$6.37$

**Maximum citations (Cmax):**

被引用最高的作品的引用数。

$46$ (*An Efficient SVD-Based Method for Image Denoising, Guo, Qiang; Zhang, Caiming; Zhang, Yunfeng; Liu, Hui.*)

##  2.3.2 The Hirsch-index and its complements
以下指标为山西财经大学2016年sci指标
找到的结果数	$84$
被引频次总计	$535$
每项平均引用次数	$6.37$

**The Hirsch-index:**

一个有N篇论文的论文集，如果其有h篇论文的引用数大于或等于h，另外N-h篇论文的引用数小于h，则其Hirsch-index为$h$。

$$
h=\max \{j : c(j) \geq j \text { and } c(j+1)<j+1\}
$$

$c(j)$为按引用数从高到低排序后第j篇论文的引用数。

> $h=13$

**The A- and R-indices:**

$A$-index 是论文集在h指数中的论文的引用均值。

$$
A=\frac{1}{h} \sum_{j=1}^{h} c(j)
$$

$h$是$h$指数。

> $A=28.62$

$A$-index对于高h指数的论文集有“惩罚”，Jin et al.
（2007）引入了$R$-index。

$$
R=\sqrt{\sum_{j=1}^{h} c(j)}
$$

> $R=19.29$

**The $R_m$-index:**

$R_m$-index是对$R$-index的改造。

$$
R_{m}=\sqrt{\sum_{j=1}^{h} c(j)^{\frac{1}{2}}}
$$

> $R_m=8.12$

**The $a$-index:**

$h$-index中，如果$h$-core中的文章并不是恰好都有$h$引用数的话，$h^2$与$h$-core中文章的总引用数会不一致。Hirsch (2005)定义了$a$-index。

$$
a=\frac{TC_{H}}{h^{2}}
$$

其中$TC_{H}$是$h$-core文章的总引用。

> $TC_{H}=372$
> 
> $a=2.20$

**The $v$-index:**

$h$-core文章数占总文章数的百分比。

> $v=13/84 \times 100=15$

**The $e$-index:**

$e$-index旨在考虑$h$-core中的过多引用。

$$
e=\sqrt{\sum_{j=1}^{h} c(j)-h^{2}}
$$

> $e=14.25$

**The $k$-index:**

为了考虑到$h$-core外的文章，Rousseau and Ye（2010）提出了$k$-index，比较两个比率：一个是总引用的平均值，另一个是分别在尾部（$h$-core以外）和$h$-core中实现的引用的比率。

$$
k=\frac{TC_{N}}{N}/\frac{TC_{T}}{TC_{H}}=\frac{TC_{N}\times TC_{H}}{N(TC_{N}-TC_{H})}
$$

其中$TC_{N}$是总引用，$TC_{H}$是$h$-core中文章的总引用，$TC_{T}$是$h$-core外文章的总引用。

> $k=14.54$

**The $h^2$-lower, $h^2$-center and $h^2$-upper indices:**

Bornmann et al.（2010）引入一组指数来考察出版物的引用分布。

$$
h^{2}-lower=\frac{100 \sum_{j=h+1}^{N} c(j)}{\sum_{j=1}^{N} c(j)}
$$

$$
h^{2}-center=\frac{100 h^2}{\sum_{j=1}^{N} c(j)}
$$

$$
h^{2}-upper=\frac{100 \sum_{j=h+1}^{N} (c(j)-h)}{\sum_{j=1}^{N} c(j)}
$$

> $h^2-lower=28.04$
> 
> $h^2-center=31.59$
> 
> $h^2-upper=-104.11$


**The $j$-index:**

$j$-index由两部分组成，第一部分就是$h$-index。

| k      | 1      | 2      | 3      | 4      | 5      | 6      | 7      | 8      | 9      | 10     | 11     | 1 2 |
|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|-----|
|$\Delta h_k$| 500    | 250    | 100    | 50     | 25     | 10     | 5      | 4      | 3      | 2      | 1\.5   | 1\.25  |
|$w_k$   | 1\.000 | 0\.500 | 0\.333 | 0\.250 | 0\.200 | 0\.167 | 0\.143 | 0\.125 | 0\.111 | 0\.100 | 0\.091 | 0\.083 |

$$
j=h+\frac{\sum_{k=1}^{12} w_{k} N_{k}\left(h \Delta h_{k}\right)}{\sum_{k=1}^{12} w_{k}},(k=1,2, \ldots 12)
$$

其中$w_k$是上表中第$k^{th}$增量对应的权重；$h \Delta h_{k}$是第$k^{th}$增量的阈值；$N_{k}$是第$k^{th}$增量时超过阈值的文章数。

> $j=24.19$

**The $h_{rat}$-index:**

$h_{rat}$-index主要概念是考虑最坏的情况，以估计可能的补偿。

$$
h_{r a t}=h+1-\frac{x}{x_{\max }}=h+1-\frac{x}{2 h+1}
$$

其中$x$是该论文集的$h$-index为达到$h+1$时需要增加的最少引用量。$x_{\max }=2h+1$。

> $h_{rat}=13.81$

**The $h_r$-index:**

$h_r$-index主要关注第$h^{th}$和${(h+1)}^{th}$的引用量。

$$
h_{r}=\frac{(h+1) c(h)-h c(h+1)}{1-c(h+1)+c(h)}
$$

> $h_{r}=13$

**The $Maxprod$ index:**

$Maxprod$ index综合考量了发表文章数和引用数之间的平衡。

$$
Maxprod=\max \{r(j) * c(j)\}
$$

$r(j)$等于第$j^{th}$文章在该论文集中引用数的排名。

> $Maxprod =234$

**The $h^{(2)}$-index:**

一个有$N$篇论文的论文集，如果其有$h^{(2)}$篇论文的引用数大于或等于${h^{(2)}}^2$，另外$N-h^{(2)}$篇论文的引用数小于${h^{(2)}}^2$，则其$h^{(2)}$-index为$h^{(2)}$。

$$
h^{(2)}=\max \left\{j : c(j) \geq j^{2}\right\}
$$

> $h^{(2)}=5$

**The $w$-index:**

一个有$N$篇论文的论文集，如果其有$w$篇论文的引用数大于或等于$10w$，另外$N-w$篇论文的引用数小于$10(w+1)$，则其$w$-index为$w$。

$$
w=\max \{j : c(j) \geq 10 j \text { and } c(j+1)<10(j+1)\}
$$

> $w=4$

**The $h_w$-index:**

Egghe（2008a）认为h指数缺乏对绩效变化的敏感性，提出了$h_w$-index。

$$
h_{w}=\sqrt{\sum_{j=1}^{r_{0}} c(j)}
$$

其中$r_{0}=\max \{j:\frac{T C_{j}}{h} \leq c(j)\}$。

> $h_w=17.75$

**The $\pi$-index:**

定义“高引用杰出集”$P_{\pi}=\sqrt{N}$，当论文集以引用数从高到低排序时，

$$
\pi=0.01 T C_{P_{\pi}}
$$

其中$T C_{P_{\pi}}$是“高引用杰出集”的总引用。

> $\pi=3.15$

**The mock $h$-index：**

与原始$h$-index相比，$h_{mock}$-index的一个优点是它对引用增加的敏感性。此外，没有引用的出版物将显着降低$h_{mock}$-index，而不会影响$h$-index。 然而，作者还提到了$h_{mock}$-index的一个缺点：考虑到新发表的出版物接受引用会有时间延迟，新发表出版物的增加实际上会降低$h_{mock}$-index。

$$
h_{mock}=\left(\frac{ {TC_{N}}^{2} }{N}\right)^{\frac{1}{3}}
$$

> $h_{mock}=15.05$

**The citation speed $s$-index:**

一个有$N$篇论文的论文集，如果其有$s$篇论文的首次被引用时间在$s$个月前，另外$N-s$篇论文的首次被引用时间不足$s$个月，则其$s$-index为$s$。

> 没有获得月度数据。

## 2.3.3 The $\text {g}$-index and related

**The $\text {g}$-index:**

Egghe（2006）提出了$\text {g}$指数，以寻求出版物数量和平均引用之间的平衡。

$$
\text {g}=\max \{j: \frac{TC_{j}}{j} \geq j \text{ and } \frac{TC_{j+1}}{j+1} \leq j+1 \}
$$

> $\text {g}=21$

**The $\text {g}_{rat}$- & $\text {g}_r$-index:**

$$
\text {g}_{r a t}=\text {g}+1-\frac{(\text {g}+1)^{2}-T C_{\text {g}+1}}{2 \text {g}+1}
$$

$\text {g}$是$\text {g}$-index，$TC_{\text {g}+1}$是前$(\text {g} + 1)$篇文章的总引用数。

> $\text {g}_{rat}=22$


过两点$(\text {g}, TC_{\text {g}})$和$(\text {g}+1, TC_{\text {g}+1})$的直线与曲线$y=x^2$的交点被定义为$\text {g}_{r}$-index。

$$
\text {g}_{r}=\frac{1}{2} c(\text {g}+1)+\sqrt{T C_{\text {g}}+\frac{1}{4} c(\text {g}+1)^{2}-\text {g} c(\text {g}+1)}
$$

> $\text {g}_{r}=21.45$

**The $f$- and $t$-indices:**

$$
f=\{f: \max \left[\frac{1}{\frac{1}{f}\sum_{j=1}^{f}\frac{1}{c(j)}} \right] \geq f \}
$$

> $f=17$

$$
t=\{t: \left[\exp \left(\frac{\sum_{j=1}^{t} \ln c(j) }{t} \right) \right] \geq t \}
$$

> $t= 19$

**The $h\text {g}$-index:**

$$
h\text {g}=\sqrt{h \times \text {g}}
$$

> $h\text {g}= 16.52$

## 2.4 The field normalization for bibliometric indicators
**Field-normalized total citations:**

Field-normalized total citations使得有可能比较不同研究领域的研究人员。

$$
TC_f = \sum_{j=1}^{N} c_{f}(j)
$$

其中$c_{f}(j)$是归一化后的引用数。

> $TC_f = 11.63$
