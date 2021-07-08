#include <SFML/Graphics.hpp>
#include <iostream>


struct Agent
{
    int x;
    int y;
    float angle;
};


//Agent updateAgent(Agent agent) {

//    agent.x++;
//    return agent;

//}

const int WIDTH = 2560;
const int HEIGHT = 1600;
int canvas[WIDTH][HEIGHT] = {0};

int main()
{
    //##########################
    //		SETUP
    //##########################
    sf::RenderWindow window( sf::VideoMode(WIDTH, HEIGHT), "Test" );
    window.setFramerateLimit(60);



    //##################################
    //		INIT object
    //##################################
    sf::RectangleShape r1;
    r1.setSize(sf::Vector2f(3, 3));
    r1.setPosition(0, 0);

    std::vector<Agent> agents(200);


    int i = 0;
    for (auto& agent : agents)
    {
	agent.x = rand() % 100;
	agent.y = rand() % 100;
	//agent.x = i+20;
	//agent.y = i+20;
	agent.angle = 1;
	i++;
    }



    // loop over canvas, fade and blur



    //#################################
    //		MAIN LOOP
    //#################################
    while ( window.isOpen( ) )
    {
        sf::Event event;

        while ( window.pollEvent( event ))
        {
            switch( event.type ) {
                case sf::Event::Closed:
                    window.close();
                    break;
            }
        }
	//####################################
	//		DRAW STEP
	//####################################

	for (auto& agent : agents) {
	    // move agent

	    int newx = agent.x + static_cast<int>(round(5 * sin(agent.angle)));
	    int newy = agent.y + static_cast<int>(round(5 * cos(agent.angle)));

	    if (newx < 0 || newx > WIDTH || newy < 0 || newy > HEIGHT*2)
	    {
		newx = std::min(WIDTH, std::max(0, newx));
		newy = std::min(WIDTH, std::max(0, newy));
		//newx = 0;
		//newy = 0;
		agent.angle = rand() % 7;

	    }

	    agent.x = newx;
	    agent.y = newy;

	    // update canvas
	    canvas[agent.x][agent.y] = 255;
	}

	window.clear(); // clear the frame -- draw below




	window.draw(r1);
	//r1.move(1, 1);

	//for (auto& agent : agents)
	//{
	//    agent = updateAgent(agent);
	//    sf::RectangleShape r2;
	//    r2.setSize(sf::Vector2f(3, 3));
	//    r2.setPosition(agent.x, agent.y);
	//    window.draw(r2);
	//}
	for(int x = 0; x < WIDTH; x++) // Iterating over rows
	{
	    for(int y = 0; y < HEIGHT; y++)
	    {
		if (canvas[x][y] != 0)
		{
		    int reduce = canvas[x][y] - 3;
		    if (reduce < 0)
		    {
			canvas[x][y] = 0;
		    } else
		    {
			canvas[x][y] = reduce;
		    }
		    sf::RectangleShape r2;
		    r2.setSize(sf::Vector2f(1, 1));
		    r2.setPosition(x, y);
		    r2.setFillColor(sf::Color(canvas[x][y], canvas[x][y], canvas[x][y], 225));
		    window.draw(r2);
		}
	    }
	}

        window.display(); // display

    }

}


//std::vector<Agent> updateLocations(std::vector<Agent> agents) {

//    // modify agents

//    int i = 0;
//    for (auto& agent : agents)
//    {
//        agent.x++;
//        i++;
//    }

//    return agents
//}



