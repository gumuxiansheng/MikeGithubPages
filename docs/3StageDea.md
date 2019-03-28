# 三阶段DEA模型

## DEA基本模型

近年来，数据包络分析模型（简称DEA模型）这一有效的效率评价方法被得到广泛应用。DEA模型搜集分析基于决策单元（DMU）的数据，应用数学规划方法确定相对有效的生产前沿面，对于生产前沿面上的各决策单元的投影，通过比较各决策单元偏离DEA前沿面的程度从而评价各决策单元的相对有效性，偏离度越小，则说明相对效率越高。当使用DEA模型进行多投入、多产出的相对效率评价时，由于DEA模型具有不必预先估计参数、无须权重假设等特点，可以有效避免主观因素，因此它在多投入、多产出的有效性评价方面具有显著优势。基本的DEA模型有CCR和BBC两种主要模式，其中CCR基于固定规模报酬假设，而BBC模式基于变动规模报酬假设。由于本文的决策单元无法自由选择规模大小，从而采用DEA模型中的CCR模式。

假设有$R$个决策单元，投入数为$m$，产出数为$n$，对于决策单元$k$，$X_i^k$和$Y_j^k$分别表示第$i$种投入和第$j$种产出量，DEA模型以寻求此决策单元效率$E_k$的最大化为目标，得出最有利的投入项权重组合以及产出项权重组合，CCR模式的线性规划数学方程如下：

$$
        \begin{aligned}
             & Max \qquad h_{k}=\sum_{j=1}^{n} u_{j}^{k} Y_{j}^{k}                                                   \\
             & s.t. \qquad \quad \sum_{i=1}^{m} v_{i}^{k} X_{i}^{k}=1                                                \\
             & \qquad \sum_{j=1}^{n} u_{j}^{k} Y_{j}^{r}-\sum_{i=1}^{m} v_{i}^{k} X_{i}^{k} \leq 0, r=1,2, \cdots, R \\
             & \qquad \quad u_{i}^{k} \geq \varepsilon \geq 0, j=1,2, \cdots, n                                      \\
             & \qquad \quad v_{i}^{k} \geq \varepsilon \geq 0, i=1,2, \cdots, m
        \end{aligned}
$$

从而，通过求解线性规划的最优解评价决策单元的有效性。为了计算的方便以及获取各个投入产出的效率，这一问题一般转换为其对偶形式求解：

$$
        \begin{aligned}
             & Min \qquad h_{k}=\theta-\varepsilon\left(\sum_{i=1}^{m} s_{i}^{-}+\sum_{j=1}^{n} s_{j}^{+}\right) \\
             & s.t. \qquad \sum_{r=1}^{R} \lambda_{r} X_{i}^{r}-\theta X_{i}^{k}+s_{i}^{-}=0, i=1,2, \cdots, m   \\
             & \qquad \sum_{r=1}^{R} \lambda_{r} Y_{j}^{r}-s_{j}^{+}=Y_{j}^{k}, j=1,2, \cdots, n                 \\
             & \qquad s_{i}^{-}, s_{j}^{+} \geq 0, i=1,2, \cdots, m, j=1,2, \cdots, n
        \end{aligned}
$$

其中$R$是决策单元个数，$s_i^-$，$s_j^+$为投入产出的差额变量，代表为达到有效前沿所需减少的投入或增加的产出。$h_k$ 为有效值，当$h_k=1$，$s^-=s^+=0$时，该决策单元处于效率前沿，当$h_k<1$时，该决策单元相对无效率。

## 三阶段DEA模型

DEA基本模型在对各个决策单元进行效率评价时，包含了外部环境以及随机扰动对效率的影响，所以其计算出的结果与实际效率值存在偏差，Fried et al.（2002）提出三阶段DEA模型，目的在于将外部环境以及随机扰动的影响排除，从而考察真实的效率。三阶段DEA模型步骤如下：

第一阶段：普通DEA模型求解，得到各个投入的差额变量（松弛变量）。差额变量由三方面引起：1、真实技术效率，2、外生环境影响，3、随机扰动。

第二阶段：以第一阶段得到的各个投入差额量为因变量，环境变量为自变量，可以构建SFA模型考察环境变量对各个投入差额量的影响。其影响公式如下：

$$
    s_{ik}=f^{i}(\boldsymbol{z}_{k}; \boldsymbol{\beta}_{i}) + v_{ik} + u_{ik}
$$

其中$s_{ik}$是第一阶段第$k$个决策单元第$i$项投入的差额量，$$\boldsymbol{z}_{k}$$表示环境变量，$v_{ik}$代表影响生产活动的随机因素，$$v_{ik} \sim N(0, \sigma_{v_{ik}}^{2})$$，$$f^{i}(\boldsymbol{z}_{k}) + v_{ik}$$代表随机前沿生产函数；$u_{ik}$（非负）体现了生产无效率，一般假设它是独立同分布的半正态随机变量（$u_{ik} \sim N^{+}(0, \sigma_{u_{ik}}^{2})$）独立于$v_{ik}$。$v_{ik} + u_{ik}$为复合误差项，SFA过程得到的残差值就是两项之和，根据两个变量的分布假设，利用极大似然法可以求出$v_{ik}$和$u_{ik}$分别的值。本文根据罗登跃（2012）指出的三阶段DEA复合误差项分离公式求解：

$$
E\left(u_{ik} | \varepsilon_{ik}\right)=\frac{\lambda_{k} \sigma_{k}}{1+\lambda_{k}^{2}}\left[\frac{\phi\left(\varepsilon_{ik} \lambda_{k} / \sigma_{k}\right)}{\Phi\left(\varepsilon_{ik} \lambda_{k} / \sigma_{k}\right)}+\frac{\varepsilon_{ik} \lambda_{k}}{\sigma_{k}}\right]
$$

其中$\varepsilon_{ik}=v_{ik}+u_{ik}$为复合误差项，$\sigma_{k}^{2}=\sigma_{v_{ik}}^{2} + \sigma_{u_{ik}}^{2}$，$\lambda_{k}=\sigma_{uk}-\sigma_{vk}$，$\phi(\cdot)$是标准正态分布概率密度函数，$\Phi(\cdot)$是标准正态分布累积密度函数。

$$
E\left(v_{ik} | \varepsilon_{ik}\right)=s_{ik}-\boldsymbol{z}_{k} \hat{\boldsymbol{\beta}}_{i} - E\left(u_{ik} | \varepsilon_{ik}\right)
$$

第三阶段：以最没有效率的决策单元相应投入量为参照，对其它各决策单元相应投入量进行调整：

$$
        x_{i k}^{A}=x_{i k}+\left[\max_{k}\left\{\boldsymbol{z}_{k} \hat{\boldsymbol{\beta}}_{i}\right\}-\boldsymbol{z}_{k} \hat{\boldsymbol{\beta}}_{i}\right]+\left[\max _{k}\left\{\hat{v}_{i k}\right\}-\hat{v}_{i k}\right] \\
        i=1,2,3, \cdots, m; \qquad k=1,2,3,\cdots, R
$$

$x\_{i k}^{A}$是第$k$个决策单元的第$i$项实际投入$x_{i k}$排除掉环境变量因素和随机扰动因素之后的调整量。$$\max_{k} \left\{\boldsymbol{z}_{k} \hat{\boldsymbol{\beta}}_{i}\right\}$$是所有决策单元中环境因素造成的差额变量改变估计的最大值，代表了遇到最坏环境因素情况下的差额，它减去单个决策单元的实际环境因素影响下差额估计值$$\boldsymbol{z}_{k} \hat{\boldsymbol{\beta}}_{i}$$，表示此单元在遇到最坏环境的时候为达到同样产出此投入需要增加的量。$$\max_{k}\left\{\hat{v}_{i k}\right\}$$是所有决策单元中随机扰动造成的差额变量改变估计的最大值，表示最坏的随机扰动对投入差额产生的影响，减去单个决策单元实际随机扰动影响下差额估计值$$\hat{v}_{i k}$$表示此单元在遇到最坏的随机扰动情况下为达到同样的产出此投入需要增加的量。因此，$$x_{i k}^{A}$$是实际投入排除环境影响和随机扰动影响后的纯技术投入量。

得到调整后的投入后，再进行DEA效率检测。此时每个决策单元面临的环境因素和随机因素的影响基本一致，因此得到的结果是真实的对投入应用的效率。