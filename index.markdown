---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title:
---

{% include title.html %}

Since what is considered as the first commercial cinematographic projection by Les Frères Lumière in Paris, December 1895, the movie industry has grown to be worth several tens of billions dollars. Dozens of studios were created, producing an increasing number of movies each year. Today, several thousands of movies are released worldwide each year and they represent an unnegligable cultural vector. Movies are an important instrument in the soft power toolbox. Thus, we came to ask ourselves this burning question: what is the influence of the movie industry around the world ?


Of course that is too grand a question to be answered with the tap of a finger. But nonetheless, we can try to focus on specific aspects of the movie industry, such as actors. Here's our attempt to collect some nuggets of information about the world of movies and actors in it.

## How ?
At our disposition, we have an already existing dataset concerning only actors and movies : the **CMU Movie Summary Corpus** (citation). We will try to make the most out of it to get a little information on the movie industry through the lens of actors!

Provided with this information, we excavate an underpinning structure of the movies' world. We draw a sort of *Facebook of actors* where actors are *friends* if they played in one or several movies together.

Once we have our network, we can cluster actors in communities of strongly-related individuals using the Louvain algorithm. Then, the computed communities can be characterized to understand who gets to access the wider communities, how interconnected the communities are and lots of other fascinating questions. With the initial corpus, we got information on actors date of birth, movies they played in, genres, languages and countries of movies. To have a better understanding of the main communities, we decided to scrape additionnal information such as actors nationality and occupations. However, as scraping is a very time-consuming task, we decided to only apply it on the 20 most populated communities. 

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Let’s start our journey to explore the results ! <br>
Our quest : identifying and naming as much communities as we can
</p>
</blockquote>


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
Community 20 is the only one comprising a majority of Swedish actors (more than 85%).

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered community 20 : <b>The Nordic Crew </b>
</p>
</blockquote>

Concerning **occupation**, the three most recurring occupations concern less than half of each community's population. Thus, communities as less homogeneous over occupations than over nationality. 

### Communities intra and interrelationships

The whole visualisation containing all the 8000 datapoints is quite messy and hard to read. We see that there may be some denser communities, some communitites that seem strongly connected with another and other that seem to not interact. How can we try to better visualise these characteristics? 
Well, the world of data viz is well made and we can easily manage to highlight how the 20 most prominent communities interact with each other. On the graph below, you can see our 20 communities. The size of the sphere depicts the number of intralinks within a communinity, while the width of edges depicts the number of links between 2 communities. 

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

An interesting structure appears : 15 communities seem highly interconnect, with the 1rst and the 2nd community at the center of the web.

On the other hand, communities 3, 5 and 10 interact with each other but have no connections with the rest of the communities. And lastly, 2 remaining communities (namely number 11 and number 14) think they are better off alone and are not connected to anyone else.

Crossing this newfound information with the communities characterisation, we realise that the 3 connected communities are the 3 indian communities, and the 2 standalone ones both come from Japan ! 


## A deeper investigation on selected topics
Sooo, now that we have laid the stage, let's dig deeper on specific subjects. Here's a small selection of in-depth analyses. 


### The Time machine

Our dataset spans over more than a century. It contains movies as old as 1888 up to 2016 ! The Louvain algorithm clustered actors without having any information on the time dimension of the data. Let’s see how this information helps us interpret the network. 

{% include Gapminder.html %}

The first communities to appear in time are the 2nd, 16th and 18th ones in 1908. On the map, they all appear in the United States. That is an interrogating observation since in the late 19th and beginning of the 20th century, we know that the european film industry (and especially the French one) was dominating. Even when looking at the first movies produced in each community, we see that 2,16 and 18 solely originate from the U.S.A. 

Examples of movies from 2, 16 and 18 communities in their early age : 
-The Call of the Wild, 1908, USA
-The Sealed Room, 1909, USA
-In Little Italy, 1909, USA
-Flames and Fortune, 1911, USA

>Why is that ?
>One explanation would be the lack of data. Indeed, before the 1910s, crediting the actors was not a widespread habit. As our analysis relies a network based on actors, movies with no actors mentionned simply don’t appear.

Movies not appearing in the network
-movie 1
-movie 2

The map described the community size accumulated over the years. Let’s now take a look at a yearly distribution of movies in the communities. 

{% include movies_time_dist.html %}

Community 18 for starters shows a very dense production in the 1910s. Movies included are U.S. silent, black and white short films featuring actors such as Charlotte Burton or Harry von Meter. 

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered community 18 : <b>The Dawn of American Cinema</b>
</p>
</blockquote>

This community fades out quickly, lasting only aroud 35 years. This is why its main features are very representative of the first era of the cinema. Sadly, as you may remember from the Network and Communities description earlier, it was also the community performing the higher gender parity within its ranks. This is a bad omen concerning the gender equity of more contemporary communities. 

On the other hand, community 2 spans over a whole century.  We would expect the community to evolve over time (for example transitionning from black and white to color technologies). Contrary to community 18, it did perform badly in terms of gender parity, but maybe there is an improvement with time? 

{% include gender_2.html %}

Well, provided with the gender ratios over time, we don't really know wether the gender parity improved over time or not. There is a high variance between the years. To see wether there are so underlying tendencies, we tried fitting a regression line on the data, but in resulted in a flat line which didn't explain the variance (R^2 = 0.006). So there doesn't seem to be an increasing tendency over the whole century. However, we can see that since the 2000s the parity is more stable. 

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered community 2 : <b>The Golden Oldies</b>
</p>
</blockquote>

Another short lived community is the number 11! Here the community is more recent, emerging in the 1980s. Looking at the differents features collected for this community, we discover that we are evolving in the world of japanize Anime movies. That is why it is such a recent community! 


<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered community 11 : <b>The Anime Squad</b>
</p>
</blockquote>



### India : Spot the difference game 
We discovered earlier three interconnected communities originating from India. The question is: can we spot differences between the 3 clusters? 

**Maybe they correspond to different time periods of the Indian movie industry?** 

Let's take a look at the distribution over time of the movies produced in each community. Although there are some slight differences, it doesn't seem to be the answer we are looking for.

{% include india_time.html %}


**Then maybe each community specialised in specific movies genres ?** 

Not so much difference here either. We can however note that the Indian movie Industy has a predilection for Drama over Comedy. Half of the movies in each communities are labelled as dramas whereas less than 15 % are labelled as comedies.

{% include india_genres.html %}

Another interesting discovery: the Bollywood label is not evenly distributed over the 3 communities. That's something to look into ! After a quick research on Wikipedia, one can learn that the term 'Bollywood' refers to Hindi cinema, that is the part of the Indian industry that produces movies in Hindi language. Did you know that the Republic of India had 22 scheduled languages in its Constitution? 

**So then, communities may be related to movie industries producing in different languages ?** 

Luckily, our dataset provides us with data on languages in which a movie is produced. Bingo ! The 3 communities seem to have different main languages.

{% include india_languages.html %}

The first one, community 3, mainly contains movies produced in Hindi language (79%). This is consistent with the 'Bollywood' label that we noticed earlier. The main 3 actors of this community (i.e. the most connected ones) are Shakti Kapoor, Amitabh Bachchan, Mithun Chakraborty. A quick journey on their personnal Wikipedia page confirms that we are dealing with the **Bollywood community**. Bollywood is indeed considered as the major sector within Indian Cinema.

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered a new community : <b>The Bollywood Drama Club</b>
</p>
</blockquote>

The second one, community 5, is less sharply selective over one language. The most recurring languages are Tamil and Telugu languages, which are the biggest film industries after Bollywood. Fun fact, Telugu Cinema is also know as **Tollywood**. Within this community, we find personnalities related to Telugu Cinema, such as Brahmanandam and Ali, but also more intersectionnals actors. Nassar for example main plays in Tamil and Telugu Cinema, and Prakash Raj works in many different industries, comprising Tamil, Telugu, Hindi, and Malayalam-language films. 

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered a new community : <b>The Tollywood Stars</b>
</p>
</blockquote>

<><img  src="assets/images/india_languagemap.svg" width="300"/><>

Which leads us to the last community, number 10. That one is related to Malayalam Cinema (also named as, as you can guess ... Mollywood!) within which one can find actors such as Jagathi Sreekumar, Mohanlal Viswanathan and Mammootty.
Malayalam, Telugu and Tamil Cinema are all a part of the Cinema of South India.

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered a new community : <b>The Mollywood Comedy</b>
</p>
</blockquote>


### Genre Analysis

The dataset provides over 300 genre labels. Let’s see how this information can help us identify communities. To make the information more readable, we only observe the 5 most recurring genres in each community, and their % of appearence within the movies of said community. 

{% include movies_genres_matrix.html %}

First observation : the mainstream genres, such as *drama, comedy, romance, thriller, action* are too widely used and will be of no help in identifying specificities communities. 

But the less-common genre provide great information ! 

We can easily find communities discovered earlier, like community 18, with its black and white and silent film labels. 

Some labels seem different that the others and catch the attention : Chinese Movies, Japanese Movies, Bollywood. These labels don’t hold information on the type of story that the movie is displaying, but on the film industry producing the movie. They are strongly present within their respective communities. Chinese Movies, for example, is the 2nd most represented label in a community, after Silent Film. Squinting the eyes to read the graph, we observe that these labels are linked to a common label : **World Cinema**. What does this label mean? We could naively interpret that World Cinema means Cinema produced in the world, and since until proven otherwise every country of Earth is part of the World, it would only seem logical that every community had that label. But this is not the case … Wikipedia (always having our back) helps us understand this unknown concept : it is the negation of the Cinema of the USA. Its definition encompasses everything that is not produced by the American Industry. The existence of such a term in our dataset demonstrates a bias : since the data was collected from Wikipedia English pages, it is extremely more likely to be Americentric and ignore the wonderful variety of cinemas industries on the planet.

Still, we can identify features of the communities. Community 6 relates to Martial Arts, in the tradition of the Chinese industry. 

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered a new community : <b>The Chinese Combatants</b>
</p>
</blockquote>
Let’s see what else the genre appearence matrix can help us discover. Community 7 mainly features Family Film and Animation. Mainly originating from the US, this community includes Disney and others. 

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered a new community : <b>The Cartoon Connoisseurs</b>
</p>
</blockquote>

On the bottom of the genre appearance matrix, an unknown genre label appears : Slapstick. This is a type of humor mostly used in the Golden Era of Black and White movies. Here we can find The Three Stooges, a highly productive trio of comedians, with movies such as *Beer and Pretzels or Hula-La-La.* 

<blockquote style="background-color: #EC7B7B; color: white; border-left-color: #821718; text-align: justify; padding: 5px 10px 7px 15px">
<p>
📽️ Achievement ! <br>
You discovered a new community : <b>The Slapstick Comedians</b>
</p>
</blockquote>


### A Summary of Communities Description

Here ends our guided tour exploring the network. If you want to explore deeper, you can find the summary of all mentionned communities and more here. 

## Conclusion 

To conclude, based on the analysis performed on a database of actors and movies, we observed that clusters of actors are mainly cristallized over shared country and language spoken. Additionnal relevant features were genre and time distribution.


This analysis demonstrates again the power of algorithmic tools, which by simply clustering actors by costarred movies helped us make sense of the data and identify the main cinematographic movements and industries. 

Of course this approach does not exhaustively describes the movie industry as it comprises lots of other elements than just actors, such as people behind the camera, financials, etc. Also, let’s not forget that the dataset contains information up to 2011. It could be very relevant to try and perform an analogous study with more recent data, to uncover the changes in the last decade.


## Additionnal Game : Cherchez Charlie

The network contains plentiful of hidden gems, will you be able to spot them is the data visualisation ? 

- Charlie Chaplin

No introductions needed, he is one of the marking figures of the Silent Era. Chaplin was most known for his personna The Tramp, with his bowl hat, large shoes and cane! You can find him in the community 16. 

- Alice Guy Blaché

Here’s a incredible person! Alice Guy was a French pioneer film producer, and the first woman to ever direct a movie. She was very early convinced of the narrative potential of filming, at the time an emerging technology. She then emigrated to the USA, where she cofounded her own studios, Solax Studios. In the database that we analysed, some of her movies are present, such as the very first one, La Fée aux Choux. Alice can be found in the network but she wasn’t clustered to one of the 20 most populated communities, so you’ll have to look into the smaller communities. 

- Trigger, Pal, Skippy and Cheeta

Humans can be actors, but why could animals not be ! In the network, some actors are animals, such as Pal and Skippy the dogs, Trigger the horse, and Cheeta the chimpanzee sidekick of Tarzan. They all are a part of community 2 : <b>The Golden Oldies</b>

- the Firefighter

Sometimes when acting, you have to really become the personna you’re playing. Hence why Steve Buscemi from community 1 is also a firefighter. Loïc was very happy to know that he could have a career in the movie industry. 

*Hints to find him : it's an US actor born in 1857*

<p>
 <a href="/communities.html">
  <img src="https://www.computerhope.com/cdn/media/logo-200-gray.png">
  click here
 </a>
</p>