$(document).ready(()=>{
    $('#spinner').removeClass('hide').addClass('show');
    $.ajax({
        url: "https://newsdesk-1822.herokuapp.com/",
        type: "GET",
        error: (e)=>{
            $('#spinner').removeClass('show').addClass('hide');
            console.log(e);
        },
        success: (response)=>{
            $('#spinner').removeClass('show').addClass('hide');
            // console.log(response);
            if (response.status === "ok"){
                let total = response.totalResults;
                let cards = "";
                response.articles.forEach(item => {
                    let sName = item.source.name;
                    let title = item.title;
                    let author = (item.author === null)? "Unknown": item.author;
                    let tempDate = new Date(item.publishedAt);
                    let date = `${tempDate.getFullYear()}-${tempDate.getMonth()}-${tempDate.getDate()}`;
                    let desc = (item.description === null)? "View More": item.description;
                    let url = item.url;

                    cards += `
                        <!-- NEWS CARD -->
                        <div class="newsCard">
                        <!-- NEWS SUMMARY ; THE LEFT SIDE -->
                            <div class="shortNews">
                                <h6 id="newsSource">${sName}</h6>
                                <h2>${title}</h2>
                                <p id="reporterName"><i class="fas fa-user"></i>${author}</p>
                            </div>
                            <!-- NEWS DETAILS ; THE RIGHT SIDE -->
                            <div class="newsDetails">
                                <h3 class="newsDate"><i class="fas fa-calendar"></i>${date}</h3>
                                <p>${desc}</p>
                                <a href="${url}" class="btn">View more <i class="fas fa-newspaper"></i></a>
                            </div>
                        </div> `;
                });
                $('#newsfeed').empty().append(cards);
            }
        }
    });
});