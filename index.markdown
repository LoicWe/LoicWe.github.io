---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title:
---

{% include title.html %}

Since what is considered as the first commercial cinematographic projection by Les Frères Lumière in Paris, December 1895, the movie industry has grown to be worth several tens of billions dollars. Dozens of studios were created, producing an increasing number of movies each year. Today, several thousands of movies are released worldwide each year and they represent an unnegligable cultural vector. Movies are an important instrument in the soft power toolbox. Thus, we came to ask ourselves this burning question: what is the influence of the movie industry around the world? 

Of course that is too grand a question to be answered with the tap of a finger. But nonetheless, we can try to focus on specific aspects of the movie industry, such as actors. Here’s our attempt to collect some nuggets of information about the world of movies and actors in it.

## How?
At our disposition, we have an already existing dataset concerning only actors and movies : the **CMU Movie Summary Corpus** (citation). We will try to make the most out of it to get a little information on the movie industry through the lens of actors!

Provided with this information, we excavate an underpinning structure of the movies’ world. We draw a sort of *Facebook of actors* where actors are *friends* if they played in one or several movies together.

Once we have our network, we can cluster actors in communities of strongly-related individuals using the Louvain algorithm. Then, the computed communities can be characterized to understand who gets to access the wider communities, how interconnected the communities are and lots of other fascinating questions. With the initial corpus, we got information on actors date of birth, movies they played in, genres, languages and countries of movies. To have a better understanding of the main communities, we decided to scrape additionnal information such as actors nationality and occupations. However, as scraping is a very time-consuming task, we decided to only apply it on the 20 most populated communities. 

## The Network and Communities

### An overlook

After epics battles with Python, we finally outsmarted the beast and managed to compute our network and communities. Here it is!

 <div id="graph-1">
    <style> body { margin: 0; } </style>
    <script src="//unpkg.com/three"></script>
    <script src="//unpkg.com/three-spritetext"></script>
    <script src="//unpkg.com/3d-force-graph"></script>
    <div id="3d-graph-1">
        <script type="text/javascript" src="/3d-JS-Network/graph_cmu.js"></script>
    </div>
 </div>

<a href="3d-JS-Network/graph_complete.html">Click Here for Full Screen And Interactive Data Viz</a>

The network data includes 8 427 actors who played overall in xxxxx(less than 81 741 and more than 27 242) movies. 

As is usual in most real-world networks, the network is very sparse. Only 0.03% of all possible links between actors are present.  

*Number of nodes:  8427 <br />
Number of edges:  25865*

It stars 645 communities in total, ranging from 1080 to 2 individuals. The community sizes distribution follows a power-law distribution and only the 14 widest communities contain more than a hundred actors.

{% include community_sizes_scatter.html %}

From the interactive visualisation above, it seems that the bigger communities present interconnections with each other, while the all the smallest ones are satellites completely isolated from the center of the pack. Those small satellites probably each concern only one movie and its actors and are disconnected from the mainstream movie industy. 

For the rest of this analysis, we will only investigate the 20 main communities, as those were the ones we fetched additionnal data for. The 20 most populated communities add up to a total of 6172 actors (73% of the total number of actors in the network) who played in 27 242 movies (33% of the total number of movies included in the CMU dataset).

To analyse the communities, we will look at the actors contained within the community but also the movies represented within the community. A movie is considered as part of a community if at least two actors within the community have played in the movie. This means that a single movie can be part of multiple communities.

{% include movies_community_scatter.html %}

### Inside the communities

Let’s take a quick look at some of the most populated communities:

{% include top20_characterisation.html %}

Concerning **gender**, all of them contains more male than female actors, which is sadly not very suprising. We send our greatest congratulations to the 18th community which achieves the higher parity within its ranks (48% female and 52% male actors). 

Concerning **nationality**, at least 50% of the actors in each community come from the same country. It would seem that communities are very homogeneous over actor’s nationalities. 10 communities out of the 20 comprise a majority of american actors (more than 70%). Interestingely, there are 3 very homogeneous communities comprising more than 95% of indian actors (community 3,5 and 10). The community 12 presents a sligthly more even distribution between its 3 most recurrent nationalities (France 55%, Italy 30%, Portugal 5%).

Concerning **occupation**, the three most recurring occupations concern less than half of each community’s population. Thus, communities as less homogeneous over occupations than over nationality. 

### Communities intra and interrelationships

The whole visualisation containing all the 8000 datapoints is quite messy and hard to read. But the world of data visualisation is well made and we can easily manage to highlight how the 20 most prominent communities interact with each other. 


 <div id="graph-2">
    <style> body { margin: 0; } </style>
    <!--
    <script src="//unpkg.com/three"></script>
    <script src="//unpkg.com/three-spritetext"></script>
    <script src="//unpkg.com/3d-force-graph"></script>
    -->
    <div id="3d-graph-2">
        <script type="text/javascript" src="/3d-JS-Network/graph_com.js"></script>
    </div>
 </div>

An interesting structure appears : 15 communities seem highly interconnect, with the 1rst and the 2nd community at the center of the web. On the other hand, communities 3, 5 and 10 interact with each other but have no connections with the rest of the communities. And lastly, 2 remaining communities (namely number 11 and number 14) think they are better off alone and are not connected to anyone else.

Crossing this newfound information with the communities characterisation, we realise that the 3 connected communities are the 3 indian communities, and the 2 standalone ones both come from Japan ! 


## A deeper investigation on selected topics
Sooo, now that we have laid the stage, let’s dig deeper on specific subjects. Here’s a small selection of in-depth analyses. 

# India : Spot the difference game 
We discovered earlier three interconnected communities originating from India. The question is: can we spot differences between the 3 clusters? 

**Maybe they correspond to different time periods of the Indian movie industry?** 

Let’s take a look at the distribution over time of the movies produced in each community. Although there are some slight differences, it doesn’t seem to be the answer we are looking for.

{% include india_time.html %}


**Then maybe each community specialised in specific movies genres ?** 

Not so much difference here either. We can however note that the Indian movie Industy has a predilection for Drama over Comedy. Half of the movies in each communities are labelled as dramas whereas less than 15 % are labelled as comedies. 

{% include india_genre.png %}

Another interesting discovery: the Bollywood label is not evenly distributed over the 3 communities. That’s something to look into ! After a quick research on Wikipedia, one can learn that the term ‘Bollywood’ refers to Hindi cinema, that is the part of the Indian industry that produces movies in Hindi language. Did you know that the Republic of India had 22 scheduled languages in its Constitution? 


**So then, communities may be related to movie industries producing in different languages ?** 

Luckily, our dataset provides us with data on languages in which a movie is produced. Bingo ! The 3 communities seem to have different main languages.

{% include india_language.png %}

The first one, community 3, mainly contains movies produced in Hindi language (79%). This is consistent with the ‘Bollywood’ label that we noticed earlier. The main 3 actors of this community (i.e. the most connected ones) are Shakti Kapoor, Amitabh Bachchan, Mithun Chakraborty. A quick journey on their personnal Wikipedia page confirms that we are dealing with the **Bollywood community**. Bollywood is indeed considered as the major sector within Indian Cinema. 

The second one, community 5, is less sharply selective over one language. The most recurring languages are Tamil and Telugu languages, which are the biggest film industries after Bollywood. Fun fact, Telugu Cinema is also know as **Tollywood**. Within this community, we find personnalities related to Telugu Cinema, such as Brahmanandam and Ali, but also more intersectionnals actors. Nassar for example main plays in Tamil and Telugu Cinema, and Prakash Raj works in many different industries, comprising Tamil, Telugu, Hindi, and Malayalam-language films. 

Which leads us to the last community, number 10. That one is related to Malayalam Cinema (also named as, as you can guess … Mollywood!) within which one can find actors such as Jagathi Sreekumar, Mohanlal Viswanathan and Mammootty.
Malayalam, Telugu and Tamil Cinema are all a part of the Cinema of South India.

{% include india_languagemap.svg %}


## TBF

We can first see the distribution of the number of occurrences of climate quotes through the years of 2015 to 2020. The distribution presents an **irregular pattern**, we can see that some months have a lot of quotes, mostly due to very famous ones like the one of President Donald Trump in august 2017 when he responded to North Korea’s nuclear threats saying that the regime

> "will be met with fire, fury and frankly power, the likes of which the world has never seen before."

In 2016 there are only a few quotes due to the fact that the original dataset had fewer quotes this year. 

{% include histogram_quotes.html %}

## The quotes’ story

We can now try to retrace the **history of climate change** viewed by the quotes. To do so, a typical language processing task will be solved :  **topic detection**. We represented the topic of each month in word clouds of 20 words and then tried to connect these words to an **event** that happened that month. The size of the word is proportional to the degree to which the month’s quotes represent that particular topic. The **timeline** below shows the results of our unsupervised learning.

{% include timeline.html %}

- It is interesting to see that we can **retrace** most of the important events that happened through the years thanks to only **20 words**. It is pretty remarkable, for the years with low data how we can reconstitute a sentence that corresponds to a specific event that happened that month, like for example the photo of the signature of the Paris Agreement's pact on a friday in april. However, the more the quotes the more difficult it is to connect a specific event to the month’s quotes as the topic is getting more **general**.

- We can see that the word **‘Trump’** appears a lot in word clouds. This is naturally due to the fact that President Donald Trump is very publicized and cited a lot in the quotes. Word clouds reveal also that the **Paris Agreement** has an important media coverage in the anglophone newspapers.  We were also a little surprised by the fact that Greta Thunberg does not appear once in the word clouds as we think she became important in the figth for action for climate change these past few years. This means that she is maybe not as cited as we thought in the quotes. Naturally, a lot of general words like 'people', 'like', 'world' , 'time' appear a lot in the word clouds and make the analysis a bit harder. When the word cloud has mostly general words it is pretty impossible to retrace a specific event and there are many **possibilities**.

- Also, a lot of events that we were able to extract from the word clouds are related to big climate **protests** or climate **disasters** which are very publicized events related to climate change. 


## Who tells the story ?

### The types of newspapers 

We can now wonder which newspapers are behind the climate quotes. A lot of sources with an important share of climate quotes are websites that **convey** articles, they are in bold in the table. These types of newspapers mostly convey articles about **trendy** topics from other newspapers. This emphasises the fact that climate change became very trendy these past few years. 

The following table shows the 10 websites that have the most quotes.

| Websites            | Number of quotes |
|---------------------|-------|
| **msn.com**             | 1106632 |
| **investing.com**        | 475852 |
| jdsupra.com          | 319747 |
| **wokv.com**             | 215855 |
| **krmg.com**             | 192553 |
| **news965.com**          | 174527 |
| **wsbradio.com**         | 157839 |
| independent.co.uk     | 58124 |
| **yahoo.com**             | 57526 |
| salon.com             | 57224 |


### Breitbart VS InsideClimateNews

Two **american** newspapers that stood out by their number of quotes are **Breitbart** and **InsideClimateNews**. We found out that these two websites had 2 opposite points of view about climate change and thought it was interesting to compare these two. Breitbart is fully **against** climate change actions whereas InsideClimateNews is **pro**.

We resumed in the table below the number of quotes of Breitbart and InsideClimateNews and their number of **unique quotes**. Unique quotes are the ones that are not reused in any of the newspaper's other articles. 

| | Breitbart | InsideClimateNews |
|-|-----------|-------------|
| Number of quotes | 40'102 | 21'202 |
| Number of unique quotes | 23'185 (~58%) | 19'973 (~94%) |

- We can see that about **42%** of Breitbart quotes are reused in different Breitbart articles whereas only around **6%** of CarbonBrief quotes are reused by them. This lights out that sources and quotes are more **diversified** for InsideClimateNews than Breitbart. Breitbart articles rely on the same quotes to argue their point of view while InsideClimateNews tries to use different quotes to support their opinions in their different articles.  

We would like to know now how are the quotes reused by Breitbart. We plotted the number of occurrences of the used quotes as a function of how often these quotes are reused by Breitbart in their articles.

{% include power_law.html %}

- The plot is a **power law** which means that increasing the number of reused quotes reduces exponentially the number of occurences of the quotes. So on, we can say that Breitbart is reusing their quotes but their number of reused quotes is drecreasing very fast. Even if quotes are reused by Breitbart, they still have for the main part quotes that are reused only a few times.


Let's now investigate which newspapers **share** quotes with Breitbart and InsideClimateNews. 
The table belows shows the 10 websites that share the most number of quotes with Breitbart or InsideClimateNews. 

| Breitbart            | Number of quotes | InsideClimateNews | Number of quotes |
|---------------------|-------|---------------------|-------|
| yahoo.com           | 5180 | environmentalhealthnews.org   | 2675 |
| msn.com             | 4691 | dailyclimate.org              | 2644 |
| news12.com          | 4370 | nytimes.com                   | 1864 |
| kdhnews.com         | 4183 | msn.com                       | 1807 |
| seattletimes.com    | 3817 | yahoo.com                     | 1230 |
| sfgate.com          | 3810 | thehill.com                   | 1142 |
| startribune.com     | 3623 | startribune.com                | 914 |
| washingtontimes.com | 3609 | seattletimes.com               | 820 |
| wftv.com            | 3524 | breitbart.com                  | 805 |
| wtop.com            | 3338 | sfgate.com                     | 804 |


### The newspapers in clusters 

An interesting analysis could be to see now how these newspapers that share quotes with Breitbart or InsideClimateNews are **linked** together. 

{% include cluster_graph.html %}

- We can see in the node graph **three** clusters. If two nodes are linked this means that they share some same quotes. The **distance** between two nodes is for Breitbart the total number of quotes in Breitbart's articles divided by the number of quotes shared between Breitbart and 50 other newspapers. The same applies for InsideClimateNews. The more the links are **short**, the more there are quotes shared between newspapers.

- At first sight, this graph points out the fact that Breitbart and InsideClimateNews do not share a lot of quotes, only **30%** of the total number of quotes are shared between these two newspapers. This is interesting as it demonstrates the fact that their articles that have the same main topic which is climate change (as we filtered all other articles) have different quotes. The newspapers that share the same quotes between Breitbart and InsideClimateNews are mostly websites that convey articles like Yahoo or ExpressNews. This same cluster is at the **same distance** from Breitbart as from InsideClimateNews, this means that newspapers in this cluster relay the same amount of quotes from the pro climate newspaper as from the climate sceptic one. 

- We can see that websites associated with Breitbart represented inside the cluster are for the most climate sceptics newspapers like **FoxNews** or other newspapers that belongs to FowNews like Fox23 or NewsAdvance. Likewise, most of the websites associated with InsideClimateNews are pro climate like the WashingtonPost or the NyTimes. 

- Also, we can see that the distances between the nodes connected to Breitbart are **closer** than the ones connected to InsideClimateNews. That means that Breitbart shares a lot of quotes with other similar websites. As pointed out before, this confirms the fact that the newspapers related to Breitbart and Breitbart do not diversify their sources and use the same quotes.


### Inside Breitbart and InsideClimateNews' quotes

Let's now focus on what the quotes tell us about these newspapers. 

{% include scatter.html %}

- We can see from the graph below that the **relevance** of words for InsideClimateNews is higher than for Breitbart. This relevance score shows that the words in InsideClimateNews quotes are more **diverse and carefully chosen**. Especially when we compare these scores with the quotes from Breitbart and InsideClimateNews together, we see that Breitbart has a similar distribution of scores, while InsideClimateNews has a distinctly **skewed** distribution. This really shows the quality of the quotes used by InsideClimateNews. 

- Next, we can look deeper and see which words have the highest score for each newspaper. The more relevant a word is, the more carefully it was used, certainly to support a specific topic. The most relevant words used by InsideClimateNews are mostly words directly related to climate change, while Breitbart's are mostly more general words. For example, the most relevant word for InsideClimateNews is **'epa'**, which is the US Environmental Protection Agency. We show below most relevent words into word clouds.

<image src="assets/images/merged_word_clouds.jpg" alt="Word clouds illustration"/>

- We can therefore conclude that the quotes relayed by InsideClimateNews are more **qualitative** and the words used are more precisely chosen. This complements what we have seen previously, namely that Breitbart reuse many of the same quotes.

- However, it should be noted that this analysis is based on quotes filtered only on the word climate, and it does not mean that 100% of them are related to climate change. That is why words like 'women' or 'family' also stand out.


## What about their speakers ? 

Now, we can have a review about **speakers** in Breitbart and InsideClimateNews quotes. Thanks to the wikidata data set, we made a link between the quotes' speakers and their political orientation. It’s important to take into account the fact that some people have changed their political orientation, so on, some people can be affiliated to more than one political orientation. 

### Breitbart quotes political views

{% include pie_breitbart_final.html %}

### Inside Climate News quotes political views

{% include pie_inside_final.html %}
 
- We can first notice that Breitbart and InsideClimateNews both have the same percentage of speakers for which we identified a political opinion, 69% for Breitbart and 62% for InsideClimateNews. This illustrates how **politicized** the subject of climate change is.  

- We have to notice that Unkown include either quotations which don't have speakers or have speakers whithout significant political views.

- Both newspapers' speakers are for the majority from the two important political parties of the USA, **Republican** and **Democratic** parties. This shows the importance of these political parties in these two american newspapers. It is interesting, but not very surprising to notice that Breitbart is the only newspaper between the two that has the **Independent Party of America** represented which is a party that is openly against climate change.

- Breitbart has more than **41%** of their quotes' speakers that belong to american’s political parties whereas InsideClimateNews only has **21%** that does. In the category 'other parties', political parties from many countries are represented like the english Conservative party or the french one La République en Marche. This shows that even though the two newspapers are american, one diversifies more his speakers than the other. InsideClimateNews gives a more **global** overview of climate change referring speakers from all over the world in his articles than Breitbart. 



## Conclusion

After a little rewind about the history of climate change of these past years we were interested in looking at who was behind that story. We then focused on two newspapers that we thought interesting as they have a totally different opinion regarding climate change. The pro climate newspaper uses more **unique** quotes, whose quotes are more **relevant** and more related to climate change in their articles and whose speakers are politically **diversified**. Also, the climate sceptic newspapers cluster all share the same quotes and are not very diversified.


# Bibliography

- February 2015 : Goldenberg, S. & Roberts, D. Obama rejects Keystone XL pipeline and hails US as leader on climate change. The Guardian (2015).
- May 2015 : Gambino, L. Barack Obama: climate deniers pose serious threat to US security. The Guardian (2015).
- August 2015 : 2015 State of the Climate: Sea Level NOAA Climate.gov. [https://www.climate.gov/news-features/featured-images/2015-state-climate-sea-level](https://www.climate.gov/news-features/featured-images/2015-state-climate-sea-level).
- December 2015 : World Climate Summit 2015. Cop21 [https://cop21.org/](https://cop21.org/).
- March 2016 : Trans-Pacific Partnership. Wikipedia (2021).
- April 2016 : Quotebank quote
- June 2017 : Statement by President Trump on the Paris Climate Accord – The White House. [https://trumpwhitehouse.archives.gov/briefings-statements/statement-president-trump-paris-climate-accord/](https://trumpwhitehouse.archives.gov/briefings-statements/statement-president-trump-paris-climate-accord/).
- March 2018 : International Solar Alliance and India - OBJECTIVE IAS. [https://objectiveias.in/international-solar-alliance-and-india/](https://objectiveias.in/international-solar-alliance-and-india/) (2018).
- August 2018 : 2018 California wildfires. Wikipedia (2021).
- March 2019 : School Strike for Climate. Wikipedia (2021).
- August 2019 : 2019 Amazon rainforest wildfires. Wikipedia (2021).
- September 2019 : September 2019 climate strikes. Wikipedia (2021).
- January 2020 : 2019–20 Australian bushfire season. Wikipedia (2021).
