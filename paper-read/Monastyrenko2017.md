# Eco-efficiency outcomes of mergers and acquisitions in the European electricity industry
<!--Eco-efficiency outcomes of mergers and acquisitions in the European electricity industry-->
<!--2019-05-22-->

```
@article{Monastyrenko2017,
abstract = {The European electricity industry was recently liberalized. In response, there was a surge of mergers and acquisitions (M{\&}As). This study addresses the effects of M{\&}As on the eco-efficiency of European electricity producers in 2005–2013. The environmental production technology comprises CO2 emissions as an undesirable output. I compute eco-efficiency using data envelopment analysis (DEA) and the Malmquist-Luenberger productivity index, which are both based on radial directional distance function. I observe a decreasing trend in average eco-efficiency, which contradicts the previously documented moderate efficiency gains of liberalization. The effects of M{\&}As are isolated using second-step fractional regression. The domestic horizontal M{\&}As, which are systematically regulated by the European Commission, have no impact. Although one cross-border horizontal deal has a same-year effect of roughly −3{\%}, this effect becomes approximately +1.5{\%} over a two-year timespan. Vertical domestic M{\&}As have a short-run negative impact of 3.6{\%} that does not persist over time. Vertical international M{\&}As reduce the eco-efficiency by 2.1{\%} two years after their completion. Limited evidence suggests that the conglomerate deals are at least not harmful. The policy implication is that the merger regulation should be based on DEA eco-efficiency measures. Regulators should devote more attention to cross-border M{\&}As and particularly to vertical deals.},
author = {Monastyrenko, Evgenii},
doi = {10.1016/j.enpol.2017.04.030},
issn = {03014215},
journal = {Energy Policy},
keywords = {Carbon dioxide emissions,Data envelopment analysis,Eco-efficiency,Electric power industry,Fractional regression model,Mergers and acquisitions},
mendeley-groups = {M{\&}A,M{\&}A/DEA},
number = {April},
pages = {258--277},
publisher = {Elsevier Ltd},
title = {{Eco-efficiency outcomes of mergers and acquisitions in the European electricity industry}},
url = {http://dx.doi.org/10.1016/j.enpol.2017.04.030},
volume = {107},
year = {2017}
}
```

## Introduction

### Background

In the early 1990s, the European energy market was highly regulated. The liberalization of the European electricity sector started in 1996:

![EU_Timeline](Monastyrenko2017/img/EU_Timeline.png)

### Literature review

![literatures](Monastyrenko2017/img/literatures.png)

### Intro

Investigates the outcomes of **129** M&As that were completed by the **15** largest European electricity producers between **2004** and **2013**.

**output-oriented DEA model**

**Malmquist-Luenberger productivity index (MLPI)** -- a common measure in intertemporal efficiency evaluation.

## Data and methodology

### M&As

**129** M&As panel data for the **15** largest European electricity producers over the **2005–2013** period, **Datasource**: Thomson Reuters SDC Platinum database.

![samples_time](Monastyrenko2017/img/samples_time.png)

![market_pie](Monastyrenko2017/img/market_pie.png)

*All samples are large EU electricity producer acquires a smaller entity*

**Sample Conditions:**
1. the date of completion was between January 2004 and December 2013;
2. the acquisition was realized by one of the studied energy firms rather than by an affiliate, associate or subsidiary company;
3. the acquirer's stake was initially below 50%, but after completion of the acquisition, the stake was 50% or higher.

The total sample is composed of 93 cross-border (72.1%) and 36 domestic (27.9%) deals.

![sample_pie](Monastyrenko2017/img/sample_pie.png)

European energy firms merged most intensively in 2006 and 2008, whereas the highest share of interna- tional mergers was observed in 2005. In 2004 and 2010, nearly as many domestic as international mergers occurred.

![ma_timeline](Monastyrenko2017/img/ma_timeline.png)

![ma_repartition](Monastyrenko2017/img/ma_repartition.png)

### DEA

> **inputs**:
> 1. installed capacity
> 2. total operational expenditure 

> **outputs**:
> 1. **good outputs**: 
>    * generated electricity
>
> 2. **bad outputs**: 
>    * carbon dioxide (CO2) emissions

![input_output](Monastyrenko2017/img/input_output.png)

> **Datasource:**
> 1. the energy utility data provided by Enerdata;
> 2. PricewaterhouseCoopers (2013)[^PricewaterhouseCoopers2013];
> 3. Thomson One.

![input_output_data](Monastyrenko2017/img/input_output_data.png)

**Tow Approaches:**
1. **The window DEA approach**
   The underlying assumption is that the technological frontier does not move within the window.
2. **Malmquist-Luenberger productivity index (MLPI)**
   It can be decomposed into technical change (frontier shift -- technical efficiencie) and efficiency change (position relative to the frontier -- allocative efficiencie).

### Regression Analysis

The Two stage DEA, allows the computation of eco-efficiency values and the isolation of the causal influences of contextual factors. (Actually a **econometric model**)

The appropriate selection of the second-stage estimator should build on the properties of the obtained measures of eco-efficiency.

$$
\begin{aligned} \text {DEAscores}_{i t}=& \alpha_{0}+\alpha_{k} N u m M \& A s_{i t}+\beta_{1} \text {GenToSales}_{i t}+\beta_{2} \text { TwoMergers }_{i t}+\\ &+\beta_{3} \text {TwoCBMergers}_{i t}+\gamma_{1} K / S_{i t}+\gamma_{2} I / K_{i t}+\gamma_{3} Y / S_{i t}+ \\ &+ \gamma_{4} Leverage_{i t}+\gamma_{5}Leverage_{i t}^{2}+\gamma_{6} CurrentRatio_{it}
\\ &+\gamma_{7}CurrentRatio_{i t}^{2}\\ &+\Sigma \theta_{m} \text {Location}_{i t}+\Sigma_{2005}^{2013} \delta_{t} Y e a r_{t}+\varepsilon_{i t}
\end{aligned}
$$

![control_variables](Monastyrenko2017/img/control_variables.png)


## Results and discussion

---

[^PricewaterhouseCoopers2013]: PricewaterhouseCoopers, 2013. Climate Change and Electricity: European Carbon Factor, benchmarking of CO2 emissions by Europe’s largest electricity utilities. Les Cahiers du Développement Durable 12th Edition. PwC France.