---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title:
---

{% include title.html %}

Since what is considered as the first commercial cinematographic projection by Les Frères Lumière in Paris, December 1895, the movie industry has grown to be worth several tens of billions dollars. Dozens of studios were created, producing an increasing number of movies each year. Today, several thousands of movies are released worldwide each year and they represent an unnegligable cultural vector. Movies are an important instrument in the soft power toolbox. Thus, we came to ask ourselves this burning question: what is the influence of the movie industry around the world? 

Of course that is too grand a question to be answered with the tap of a finger. But nonetheless, we can try to focus on specific aspects of the movie industry, such as actors. Here's our attempt to collect some nuggets of information about the world of movies and actors in it.

## How ?
At our disposition, we have an already existing dataset concerning only actors and movies : the **CMU Movie Summary Corpus** (citation). We will try to make the most out of it to get a little information on the movie industry through the lens of actors!

Provided with this information, we excavate an underpinning structure of the movies' world. We draw a sort of *Facebook of actors* where actors are *friends* if they played in one or several movies together.

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

Let's take a quick look at some of the most populated communities:

{% include top20_characterisation.html %}

Concerning **gender**, all of them contains more male than female actors, which is sadly not very suprising. We send our greatest congratulations to the 18th community which achieves the higher parity within its ranks (48% female and 52% male actors). 

Concerning **nationality**, at least 50% of the actors in each community come from the same country. It would seem that communities are very homogeneous over actor's nationalities. 10 communities out of the 20 comprise a majority of american actors (more than 70%). Interestingely, there are 3 very homogeneous communities comprising more than 95% of indian actors (community 3,5 and 10). The community 12 presents a sligthly more even distribution between its 3 most recurrent nationalities (France 55%, Italy 30%, Portugal 5%).

Concerning **occupation**, the three most recurring occupations concern less than half of each community's population. Thus, communities as less homogeneous over occupations than over nationality. 

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
Sooo, now that we have laid the stage, let's dig deeper on specific subjects. Here's a small selection of in-depth analyses. 

# India : Spot the difference game 
We discovered earlier three interconnected communities originating from India. The question is: can we spot differences between the 3 clusters? 

**Maybe they correspond to different time periods of the Indian movie industry?** 

Let's take a look at the distribution over time of the movies produced in each community. Although there are some slight differences, it doesn't seem to be the answer we are looking for.

{% include india_time.html %}


**Then maybe each community specialised in specific movies genres ?** 

Not so much difference here either. We can however note that the Indian movie Industy has a predilection for Drama over Comedy. Half of the movies in each communities are labelled as dramas whereas less than 15 % are labelled as comedies.

<figure>
   <a href="https://jekyllrb.com">
   <img src="india_genre.png" style="max-width: 200px;"
      alt="India language" />
   </a>
   <figcaption>This is the Jekyll logo</figcaption>
</figure>

Another interesting discovery: the Bollywood label is not evenly distributed over the 3 communities. That's something to look into ! After a quick research on Wikipedia, one can learn that the term 'Bollywood' refers to Hindi cinema, that is the part of the Indian industry that produces movies in Hindi language. Did you know that the Republic of India had 22 scheduled languages in its Constitution? 

**So then, communities may be related to movie industries producing in different languages ?** 

Luckily, our dataset provides us with data on languages in which a movie is produced. Bingo ! The 3 communities seem to have different main languages.

<figure>
   <a href="https://jekyllrb.com">
   <img src="india_language.png" style="max-width: 200px;"
      alt="India language" />
   </a>
   <figcaption>This is the Jekyll logo</figcaption>
</figure>

The first one, community 3, mainly contains movies produced in Hindi language (79%). This is consistent with the 'Bollywood' label that we noticed earlier. The main 3 actors of this community (i.e. the most connected ones) are Shakti Kapoor, Amitabh Bachchan, Mithun Chakraborty. A quick journey on their personnal Wikipedia page confirms that we are dealing with the **Bollywood community**. Bollywood is indeed considered as the major sector within Indian Cinema.

The second one, community 5, is less sharply selective over one language. The most recurring languages are Tamil and Telugu languages, which are the biggest film industries after Bollywood. Fun fact, Telugu Cinema is also know as **Tollywood**. Within this community, we find personnalities related to Telugu Cinema, such as Brahmanandam and Ali, but also more intersectionnals actors. Nassar for example main plays in Tamil and Telugu Cinema, and Prakash Raj works in many different industries, comprising Tamil, Telugu, Hindi, and Malayalam-language films. 

Which leads us to the last community, number 10. That one is related to Malayalam Cinema (also named as, as you can guess ... Mollywood!) within which one can find actors such as Jagathi Sreekumar, Mohanlal Viswanathan and Mammootty.
Malayalam, Telugu and Tamil Cinema are all a part of the Cinema of South India.

{% include india_languagemap.svg %}

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
