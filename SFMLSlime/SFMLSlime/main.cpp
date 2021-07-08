//
//  main.cpp
//  SFMLSlime
//
//  Created by Huxley Marvit on 7/7/21.
//

//#include <iostream>
//
//int main(int argc, const char * argv[]) {
//    // insert code here...
//    std::cout << "Hello, World!\n";
//    return 0;
//}


#include <SFML/Graphics.hpp>
#include <iostream>



int main()
{
    sf::RenderWindow window( sf::VideoMode( 640, 480 ), "Test" );
    window.setFramerateLimit(60);

    sf::CircleShape shape (2);

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

        window.clear();

        shape.setPosition(100, 100);
        window.draw(shape);

        window.display();

    }

}
