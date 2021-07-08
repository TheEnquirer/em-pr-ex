#include <SFML/Graphics.hpp>
#include <iostream>
#include <cmath>

const int WIDTH = 256 * 2;
const int HEIGHT = 160 * 2;
int canvas[WIDTH][HEIGHT] = {0};

struct Agent
{
    int x;
    int y;
    float angle;
};


//float jjj
float lerp(float a, float b, float f)
{
    return a + f * (b - a);
}

float see(Agent agent, float sensorSpacingOffset)
{
    int sensorSize = 10;
    float sensorAngle = agent.angle + sensorSpacingOffset;
    float sensorDirX = sin(sensorAngle);
    float sensorDirY = cos(sensorAngle);
    int sensorCenterX = round(agent.x + sensorDirX * 2);
    int sensorCenterY = round(agent.y + sensorDirY * 2);
    float ssum = 0;

    for (int ox = -sensorSize; ox <= sensorSize; ox++)
    {
	for (int oy = -sensorSize; oy <= sensorSize; oy++)
	{
	    int posX = sensorCenterX + ox;
	    int posY = sensorCenterY + oy;

	    if (posX >= 0 && posX < WIDTH && posY >= 0 && posY < HEIGHT)
	    {
		ssum += canvas[posX][posY];
	    }
	}
    }

    //std::cout << sum << std::endl;
    //std::cout<<"test";
    return ssum;
}


int main()
{
    //##########################
    //		SETUP
    //##########################
    sf::RenderWindow window( sf::VideoMode(WIDTH, HEIGHT), "Test" );
    window.setFramerateLimit(60);
    float time = 0;



    //##################################
    //		INIT object
    //##################################
    sf::RectangleShape r1;
    r1.setSize(sf::Vector2f(3, 3));
    r1.setPosition(0, 0);

    std::vector<Agent> agents(1800);


    int i = 0;
    for (auto& agent : agents)
    {
	agent.x = rand() % WIDTH;
	agent.y = rand() % HEIGHT;
	//agent.x = i+20;
	//agent.y = i+20;
	agent.angle = rand() % 7;
	i++;
    }



    // loop over canvas, fade and blur



    //#################################
    //		MAIN LOOP
    //#################################
    while ( window.isOpen( ) )
    {
	time++;

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
	    // modify angle with sensor
	    float sensorSpacing = 2;
	    float turnSpeed = 0.5;

	    float wf = see(agent, 0);
	    float wl = see(agent, sensorSpacing);
	    float wr = see(agent, -sensorSpacing);

	    float stear = static_cast <float> (rand()) / static_cast <float> (RAND_MAX);
	    //std::cout << wf << ":" << wl << ":" << wr << std::endl;

	    if (wf > wl && wf > wr)
	    {
		agent.angle += 0;

	    } else if (wf < wl && wf < wr)
	    {
		agent.angle += (stear - 0.5) * 2 * turnSpeed;
		//std::cout << "hii";

	    } else if (wr > wl)
	    {
		agent.angle -= stear * turnSpeed;
	    } else if (wl > wr)
	    {
		agent.angle += stear * turnSpeed;
	    }

	    //agent.angle += stear * 5;



	    // move agent
	    int newx = agent.x + static_cast<int>(round(3 * sin(agent.angle)));
	    int newy = agent.y + static_cast<int>(round(3 * cos(agent.angle)));

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
		    int reduce = canvas[x][y] * 0.97;
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

	for(int x = 0; x < WIDTH; x++) // Iterating over rows
	{
	    for(int y = 0; y < HEIGHT; y++)
	    {
		float sum = 0;
		for (int ox = -1; ox <= 1; ox++)
		{
		    for (int oy = -1; oy <= 1; oy++)
		    {
			int xval = x + ox;
			int yval = y + oy;

			if (xval >= 0 && xval < WIDTH && yval >= 0 && yval < 2*HEIGHT)
			{
			    sum += canvas[xval][yval];
			}
		    }
		}

		float blur = sum / 9;

		float zero = 0;
		float diffused = lerp(canvas[x][y], blur, 0.8);
		float max_sec = diffused - 0.01;
		float evaporated = std::max(zero, max_sec);
		//std::cout << sum << blur << diffused << std::endl;
		canvas[x][y] = evaporated;

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



