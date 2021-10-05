import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./Information.css";

function Information(): JSX.Element {

const history = useHistory();

    return (
        <div className="Information">
			<span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque suscipit blandit purus id consectetur. Proin lorem risus, tempor ut ornare in, porttitor a nisi. Donec vitae mauris in quam vehicula euismod tempus id risus. Suspendisse sodales lacus a quam vestibulum, eu pretium sapien accumsan. Maecenas sed gravida urna. Nullam aliquam condimentum metus, nec ultricies eros laoreet vel. Ut feugiat eu augue ut commodo. In hac habitasse platea dictumst. Phasellus tempor velit eget felis gravida, quis placerat mi rhoncus. Quisque consectetur vitae purus vitae aliquam. Praesent a magna a est pharetra tristique eget ut justo. Pellentesque ultrices urna sed massa rhoncus, ac feugiat ex hendrerit. Mauris tincidunt orci nec dolor bibendum bibendum.

In at vestibulum ante. Cras nisl justo, tempus id felis eu, laoreet vulputate nibh. Duis lacinia, sem rhoncus viverra pretium, risus est fringilla ex, nec tincidunt magna ipsum sit amet ante. Nullam finibus leo dolor, vel facilisis velit pharetra ut. Nunc et tellus in nibh fermentum mollis. Duis facilisis vestibulum dolor at ornare. Donec id eros tristique, laoreet elit ac, pretium ligula. Etiam viverra fermentum turpis, eu feugiat felis pretium eu. Curabitur porttitor orci ac eros suscipit, vel tempor nulla varius. Curabitur at fermentum urna. Aliquam rutrum, justo id gravida tincidunt, mauris tortor cursus erat, id mollis dui enim eget purus.

Maecenas dignissim turpis eros. Suspendisse maximus augue nec condimentum laoreet. Donec vulputate tortor iaculis venenatis sodales. Etiam vel velit tristique, scelerisque libero non, sagittis ligula. In ut mattis quam. Maecenas volutpat mi nec lectus volutpat sollicitudin. In a ex dui. Nulla erat quam, finibus sed purus id, egestas dapibus tortor. Vivamus scelerisque neque sagittis velit fermentum blandit. Nunc eget facilisis justo. Curabitur odio elit, volutpat interdum fermentum non, gravida ut enim. Aliquam faucibus sit amet neque vitae ornare. Cras tempor neque enim, eget efficitur est eleifend non. Sed maximus vehicula imperdiet. Curabitur nec felis hendrerit, semper leo eget, vulputate enim.

Praesent ut ligula sit amet ante accumsan gravida in et dui. Proin quis mi ante. Aenean nec mi et risus aliquet semper eget vitae ante. Proin sed leo sit amet ante tempor porta eget eu quam. Sed sagittis orci dolor, ut tincidunt metus interdum sed. Quisque vel urna congue, tristique velit ac, venenatis libero. Nullam tristique elementum tortor, sit amet ultricies purus bibendum eu. Morbi finibus iaculis sagittis. Aenean cursus dictum faucibus. Nulla vitae odio nunc. Phasellus at tortor mauris. Vivamus in iaculis purus, nec rutrum sapien. Cras commodo dui lacus, eget semper ante consequat eleifend. Nunc vitae egestas dui. Nullam placerat ullamcorper vehicula. In vehicula mattis ultrices.

Aliquam ut semper dolor. Cras a purus ex. Nullam quis eros tristique nunc faucibus malesuada. In hac habitasse platea dictumst. Mauris diam dolor, volutpat non nisl in, ultrices iaculis eros. Sed malesuada sem at massa pellentesque, hendrerit volutpat lacus varius. Mauris ultricies justo in turpis placerat, in hendrerit est facilisis. Curabitur condimentum sit amet nulla eget lacinia. Donec id mauris vitae nibh pretium commodo at id ligula. Nulla viverra, elit sed vehicula cursus, eros tortor tristique turpis, quis rutrum quam dolor nec nisl. Ut volutpat velit odio, sit amet feugiat ante malesuada eu.
            </span>
<br/>
<br/>
            <Button onClick={()=> history.push("/home")} variant="contained" color="secondary"> back </Button>
        </div>
    );
}

export default Information;
