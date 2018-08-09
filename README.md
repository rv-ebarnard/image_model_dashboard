# image_model_dashboard

ABOUT:

An interactive dashboard displaying data from Red Ventures' image model analysis. 

Each point on the scatter plot represents one image's feature and is plotted according to its click through rate. If you hover over a point that is an image with multiple features on the plot a red dotted line will appear indicating their connection. You can filter the points for the confidence level (Google Vision's API assigns floating numbers for how confident they are that a certain features is in an image). 

The other bar graphs display the average click through rate for each image, the impact of having a feature on the image and the average click through rate of images without that feature.


WHAT STILL NEEDS TO BE DONE:

1. Send requests to Jenkins image model build for specified business
    Request has 2 headers:
    1. business (the business that the pictures came from)
    2. image source (arbitrary name the business gave the images)
    
    Returns:
    JSON with each object having an image name and feature attributes. For example, there could be 659 objects with 480 attributes each.
    _example:_
    {
      "imgcontent.1080x1080-us-c1-10sec-to5000_imgtemp.notes-video":
        {   "aliceblue":0.0,
            "aquamarine":0.0,
            "azure_x":0.0,
            "black_x": 0.0,
            "brown":0.016844444,
            "burlywood":0.0,
        },
       "img...etc"
    }
    
2. Use Django model manager to update Django models according to new data

3. Updating all the graphs according to filters and new builds
   Currently the scatter plot is the only chart with the function to update

4. Adding sparsity filter
  lower bound _n_ and upper bound _m_
  we filter out features that occur in:
  less than _n_ percent of images and/or more than _m_ percent of images

5. Reformatting y and x axis on scatter plot to adjust for new data
   X-Axis should remove categories that don't show any data points


HOW TO GET A LOCAL VERSION OF PROJECT RUNNING ON YOUR COMPUTER:

1. git clone git@github.com:rv-ebarnard/image_model_dashboard.git

2. cd mysite

3. python3 manage.py runserver

4. Go to http://127.0.0.1:8000/
