// Could be susceptible to SQL injection 
export function samePageRedirectIssue(targetURL: string){    
    if (window.location.href !== targetURL){
        window.location.href = targetURL;
    } else {
        console.log("Already Here: ", window.location);
    }
}